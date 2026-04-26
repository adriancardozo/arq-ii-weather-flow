import { User } from 'src/bussiness/entities/user.entity';
import { CreateUserInput } from '../../input/services/dtos/input/create-user.input';

export abstract class IUserRepository<Session = any> {
  abstract save(input: CreateUserInput, session?: Session): Promise<User>;

  abstract findOneBy(filter: Partial<User>, session?: Session): Promise<User | null>;
}
