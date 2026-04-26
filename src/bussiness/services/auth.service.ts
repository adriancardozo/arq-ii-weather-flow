import { Injectable } from '@nestjs/common';
import { IAuthService } from '../ports/input/services/i-auth.service';
import { IUserService } from '../ports/input/services/i-user.service';
import { CreateUserInput } from '../ports/input/services/dtos/input/create-user.input';
import { TokenOutput } from '../ports/input/services/dtos/output/token.output';
import { LoginInput } from '../ports/input/services/dtos/input/login.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(register: CreateUserInput): Promise<TokenOutput> {
    const user = await this.userService.create(register);
    return await this.login(user);
  }

  async login({ id, email }: LoginInput): Promise<TokenOutput> {
    const payload = { id, email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
