import { User } from 'src/bussiness/entities/user.entity';
import { CreateUserInput } from '../../input/services/dtos/input/create-user.input';

export abstract class IUserRepository {
  abstract save(input: CreateUserInput): Promise<User>;
}
