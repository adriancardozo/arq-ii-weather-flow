import { ClientSession, Model, mongo } from 'mongoose';
import { IEntity } from 'src/bussiness/entities/i.entity';
import { IRepository } from 'src/bussiness/ports/output/repositories/i.respository';
import { MongoTransactionService } from '../services/mongo-transaction.service';
import { plainToInstance } from 'class-transformer';
import { Type } from '@nestjs/common';
import { UnknownError } from 'src/bussiness/errors/unknown.error';
import { BussinessError } from 'src/bussiness/errors/bussiness.error';

const {
  ObjectId,
  BSON: { BSONError },
} = mongo;

export abstract class MongoRepository<
  Entity extends IEntity<EditInput>,
  CreateInput,
  EditInput,
> implements IRepository<Entity, CreateInput, EditInput, ClientSession> {
  constructor(
    protected readonly EntityClass: Type<Entity>,
    protected readonly NotFoundErrorClass: Type<BussinessError>,
    protected readonly EntityModel: Model<Entity>,
    protected readonly transactionService: MongoTransactionService,
    protected readonly relations: Array<string> = [],
  ) {}

  async save(
    input: CreateInput,
    session?: ClientSession,
    onError: (error: any) => Promise<void> = (error) => Promise.resolve(undefined),
  ): Promise<Entity> {
    return await this.transactionService.transaction(async (session) => {
      try {
        const result = await new this.EntityModel(input).save({ session });
        const populated = await result.populate(this.relations);
        const plainEntity = populated.toObject();
        return plainToInstance(this.EntityClass, plainEntity);
      } catch (error) {
        await onError(error);
        throw new UnknownError();
      }
    }, session);
  }

  async findOneBy(
    filter: Partial<Entity>,
    session?: ClientSession,
    onError: (error: any) => Promise<void> = (error) => Promise.resolve(undefined),
  ): Promise<Entity | null> {
    return await this.transactionService.transaction(async (session) => {
      try {
        const result = await this.EntityModel.findOne(this.normalizedFilter(filter), undefined, {
          session,
        });
        const populated = await result?.populate(this.relations);
        const plainEntity = populated?.toObject();
        return plainEntity ? plainToInstance(this.EntityClass, plainEntity) : null;
      } catch (error) {
        await onError(error);
        if (error instanceof BSONError) return null;
        throw new UnknownError();
      }
    }, session);
  }

  async findOneByOrFail(filter: Partial<Entity>, session?: ClientSession): Promise<Entity> {
    return await this.transactionService.transaction(async (session) => {
      const entity = await this.findOneBy(filter, session);
      if (!entity) throw new this.NotFoundErrorClass();
      return entity;
    }, session);
  }

  async find(
    filter: Partial<Entity>,
    session?: ClientSession,
    onError: (error: any) => Promise<void> = (error) => Promise.resolve(undefined),
  ): Promise<Array<Entity>> {
    return await this.transactionService.transaction(async (session) => {
      try {
        const result = await this.EntityModel.find(this.normalizedFilter(filter), undefined, { session });
        const populated = await Promise.all(result.map((result) => result.populate(this.relations)));
        const plainEntities = populated.map((result) => result.toObject());
        return plainToInstance(this.EntityClass, plainEntities);
      } catch (error) {
        await onError(error);
        throw new UnknownError();
      }
    }, session);
  }

  async updateOne(
    updated: Entity,
    session?: ClientSession,
    onError: (error: any) => Promise<void> = (error) => Promise.resolve(undefined),
  ): Promise<Entity> {
    return await this.transactionService.transaction(async (session) => {
      try {
        const schema = { ...updated, ...this.relationsSchema(updated) };
        const filter = this.normalizedFilter({ id: updated.id });
        const result = await this.EntityModel.updateOne(filter, schema, { session, upsert: false });
        if (result.acknowledged && result.matchedCount === 0) throw new this.NotFoundErrorClass();
        return updated;
      } catch (error) {
        await onError(error);
        if (error instanceof BSONError) throw new this.NotFoundErrorClass();
        throw new UnknownError();
      }
    }, session);
  }

  async deleteOneBy(
    filter: Partial<Entity>,
    session?: ClientSession,
    onError: (error: any) => Promise<void> = (error) => Promise.resolve(undefined),
  ): Promise<void> {
    return await this.transactionService.transaction(async (session) => {
      try {
        const result = await this.EntityModel.deleteOne(this.normalizedFilter(filter), { session });
        if (result.acknowledged && result.deletedCount === 0) throw new this.NotFoundErrorClass();
      } catch (error) {
        await onError(error);
        if (error instanceof BSONError) throw new this.NotFoundErrorClass();
        throw new UnknownError();
      }
    }, session);
  }

  protected normalizedFilter<EditInput, Entity extends IEntity<EditInput>>({
    id,
    ...rest
  }: Partial<Entity>): { _id?: mongo.BSON.ObjectId } & Partial<Omit<Entity, 'id'>> {
    return { ...(id ? { _id: new ObjectId(id) } : {}), ...rest };
  }

  protected relationsSchema<T = any>(updated: Entity): T {
    return {} as T;
  }
}
