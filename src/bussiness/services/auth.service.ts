import { Injectable } from '@nestjs/common';
import { IAuthService } from '../ports/input/services/i-auth.service';
import { CreateUserInput } from '../ports/input/services/dtos/input/create-user.input';
import { TokenOutput } from '../ports/input/services/dtos/output/token.output';
import { LoginInput } from '../ports/input/services/dtos/input/login.input';
import { JwtService } from '@nestjs/jwt';
import { ITransactionService } from '../ports/output/services/i-transaction.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly transactionService: ITransactionService,
  ) {}

  async register<Session>(register: CreateUserInput, session?: Session): Promise<TokenOutput> {
    return await this.transactionService.transaction(async (session) => {
      const user = await this.userService.create(register, session);
      return await this.login(user);
    }, session);
  }

  async login({ id, email }: LoginInput): Promise<TokenOutput> {
    const payload = { id, email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
