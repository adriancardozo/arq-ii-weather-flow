import { Injectable } from '@nestjs/common';
import { IUserService } from '../ports/input/services/i-user.service';
import { IUserRepository } from '../ports/output/repositories/i-user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}
}
