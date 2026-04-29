import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, mongo } from 'mongoose';
import { User } from 'src/bussiness/entities/user.entity';
import { UserAlreadyExistsError } from 'src/bussiness/errors/user-already-exists.error';
import { CreateUserInput } from 'src/bussiness/ports/input/services/dtos/input/create-user.input';
import { IUserRepository } from 'src/bussiness/ports/output/repositories/i-user.repository';
import { MongoTransactionService } from '../services/mongo-transaction.service';
import { UserNotFoundError } from 'src/bussiness/errors/user-not-found.error';
import { MongoRepository } from './mongo.repository';
import { EditUserInput } from 'src/bussiness/ports/input/services/dtos/input/edit-user.input';
import { User as UserObject } from '../schemas/object/user-object.schema';
import { Station } from 'src/bussiness/entities/station.entity';

const { MongoServerError } = mongo;

export class MongoUserRepository
  extends MongoRepository<User, CreateUserInput, EditUserInput>
  implements IUserRepository<ClientSession>
{
  constructor(
    @InjectModel(User.name) UserModel: Model<User>,
    @InjectModel(Station.name) private StationModel: Model<Station>,
    transactionService: MongoTransactionService,
  ) {
    super(UserObject, UserNotFoundError, UserModel, transactionService, ['stations']);
  }

  async save(input: CreateUserInput, session?: ClientSession): Promise<User> {
    async function onError(error: any) {
      if (error instanceof MongoServerError && error.code === 11000) throw new UserAlreadyExistsError();
      await Promise.resolve(undefined);
    }
    return super.save(input, session, async (error) => await onError(error));
  }

  override async deleteOneBy(filter: Partial<User>, session?: ClientSession): Promise<void> {
    return await this.transactionService.transaction(async (session) => {
      await super.deleteOneBy(filter, session);
      if (filter.id) {
        await this.StationModel.updateOne({ id: filter.id }, { owner: null }, { session });
      }
    }, session);
  }

  protected override relationsSchema<T = any>(updated: User): T {
    return { ...updated, stations: updated.stations?.map((station) => station.id) } as T;
  }
}
