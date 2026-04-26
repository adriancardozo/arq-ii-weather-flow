import { Injectable } from '@nestjs/common';
import { IUserService } from '../ports/input/services/i-user.service';
import { IUserRepository } from '../ports/output/repositories/i-user.repository';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../ports/input/services/dtos/input/create-user.input';
import { IHashService } from '../ports/output/services/i-hash.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    const password = await this.hashService.hash(input.password);
    return await this.userRepository.save({ ...input, password });
  }
}
