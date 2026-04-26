import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { ClientSession, Model, mongo } from 'mongoose';
import { User } from 'src/bussiness/entities/user.entity';
import { UnknownError } from 'src/bussiness/errors/unknown.error';
import { UserAlreadyExistsError } from 'src/bussiness/errors/user-already-exists.error';
import { CreateUserInput } from 'src/bussiness/ports/input/services/dtos/input/create-user.input';
import { IUserRepository } from 'src/bussiness/ports/output/repositories/i-user.repository';
import { MongoTransactionService } from '../services/mongo-transaction.service';

const { MongoServerError } = mongo;

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
}
