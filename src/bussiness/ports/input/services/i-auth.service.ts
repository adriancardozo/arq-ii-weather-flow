import { CreateUserInput } from './dtos/input/create-user.input';
import { TokenOutput } from './dtos/output/token.output';

export abstract class IAuthService {
  abstract register(register: CreateUserInput): Promise<TokenOutput>;
}
