import { Injectable } from '@nestjs/common';
import { IUserService } from '../ports/input/services/i-user.service';
import { IUserRepository } from '../ports/output/repositories/i-user.repository';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../ports/input/services/dtos/input/create-user.input';
import { IHashService } from '../ports/output/services/i-hash.service';
import { ITransactionService } from '../ports/output/services/i-transaction.service';
import { EditUserInput } from '../ports/input/services/dtos/input/edit-user.input';

@Injectable()
export class UserService<Session = any> implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly transactionService: ITransactionService,
  ) {}

  async getAll(session?: Session): Promise<Array<User>> {
    return await this.transactionService.transaction(async (session) => {
      return await this.userRepository.find({}, session);
    }, session);
  }

  async getById(id: string, session?: Session): Promise<User> {
    return await this.transactionService.transaction(async (session) => {
      return await this.userRepository.findOneByOrFail({ id }, session);
    }, session);
  }

  async create(input: CreateUserInput, session?: Session): Promise<User> {
    return await this.transactionService.transaction(async (session) => {
      const password = await this.hashService.hash(input.password);
      return await this.userRepository.save({ ...input, password }, session);
    }, session);
  }

  async findOneByEmail(email: string, session?: Session): Promise<User | null> {
    return await this.transactionService.transaction(async (session) => {
      return await this.userRepository.findOneBy({ email }, session);
    }, session);
  }

  async edit(id: string, input: EditUserInput, session?: Session): Promise<User> {
    return await this.transactionService.transaction(async (session) => {
      const user = await this.userRepository.findOneByOrFail({ id }, session);
      user.edit(input);
      return await this.userRepository.updateOne(user, session);
    }, session);
  }

  async delete(id: string, session?: Session): Promise<User> {
    return await this.transactionService.transaction(async (session) => {
      const user = await this.userRepository.findOneByOrFail({ id }, session);
      await this.userRepository.deleteOneBy({ id }, session);
      return user;
    }, session);
  }
}
