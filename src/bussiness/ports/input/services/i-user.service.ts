import { User } from 'src/bussiness/entities/user.entity';
import { CreateUserInput } from './dtos/input/create-user.input';

export abstract class IUserService {
  abstract create(register: CreateUserInput): Promise<User>;
}
