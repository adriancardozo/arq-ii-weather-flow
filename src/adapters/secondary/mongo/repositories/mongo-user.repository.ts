import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { ClientSession, Model, mongo } from 'mongoose';
import { User } from 'src/bussiness/entities/user.entity';
import { UnknownError } from 'src/bussiness/errors/unknown.error';
import { UserAlreadyExistsError } from 'src/bussiness/errors/user-already-exists.error';
import { CreateUserInput } from 'src/bussiness/ports/input/services/dtos/input/create-user.input';
import { IUserRepository } from 'src/bussiness/ports/output/repositories/i-user.repository';
import { MongoTransactionService } from '../services/mongo-transaction.service';
import { UserNotFoundError } from 'src/bussiness/errors/user-not-found.error';

const { MongoServerError, ObjectId } = mongo;

export class MongoUserRepository implements IUserRepository<ClientSession> {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly transactionService: MongoTransactionService,
  ) {}

  async save(input: CreateUserInput, session?: ClientSession): Promise<User> {
    return await this.transactionService.transaction(async (session) => {
      try {
        const plainUser = (await new this.UserModel(input).save({ session })).toObject();
        return plainToInstance(User, plainUser);
      } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) throw new UserAlreadyExistsError();
        throw new UnknownError();
      }
    }, session);
  }

  async findOneBy(filter: Partial<User>, session?: ClientSession): Promise<User | null> {
    return await this.transactionService.transaction(async (session) => {
      const plainUser = (
        await this.UserModel.findOne(this.normalizedFilter(filter), undefined, { session })
      )?.toObject();
      return plainUser ? plainToInstance(User, plainUser) : null;
    }, session);
  }

  async findOneByOrFail(filter: Partial<User>, session?: ClientSession): Promise<User> {
    return await this.transactionService.transaction(async (session) => {
      const user = await this.findOneBy(filter, session);
      if (!user) throw new UserNotFoundError();
      return user;
    }, session);
  }

  async updateOne(updated: User, session?: ClientSession): Promise<User> {
    return await this.transactionService.transaction(async (session) => {
      const filter = this.normalizedFilter({ id: updated.id });
      const result = await this.UserModel.updateOne(filter, updated, { session, upsert: false });
      if (result.acknowledged && result.matchedCount === 0) throw new UserNotFoundError();
      return updated;
    }, session);
  }

  async deleteOneBy(filter: Partial<User>, session?: ClientSession): Promise<void> {
    return await this.transactionService.transaction(async (session) => {
      const result = await this.UserModel.deleteOne(this.normalizedFilter(filter), { session });
      if (result.acknowledged && result.deletedCount === 0) throw new UserNotFoundError();
    }, session);
  }

  private normalizedFilter({ id, ...rest }: Partial<User>): { _id?: mongo.BSON.ObjectId } & Partial<User> {
    return { ...(id ? { _id: new ObjectId(id) } : {}), ...rest };
  }
}
