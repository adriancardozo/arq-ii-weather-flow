import { Injectable } from '@nestjs/common';
import { IUserService } from '../ports/input/services/i-user.service';
import { IUserRepository } from '../ports/output/repositories/i-user.repository';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../ports/input/services/dtos/input/create-user.input';
import { IHashService } from '../ports/output/services/i-hash.service';
import { ITransactionService } from '../ports/output/services/i-transaction.service';

@Injectable()
export class UserService<Session = any> implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly transactionService: ITransactionService,
  ) {}

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
}
