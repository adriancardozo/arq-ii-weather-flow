import { Injectable } from '@nestjs/common';
import { IUserService } from './interface/i-user.service';
import { IUserRepository } from '../repository/interface/i-user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}
}
