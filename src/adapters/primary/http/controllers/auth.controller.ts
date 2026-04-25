import { Controller } from '@nestjs/common';
import { IUserService } from 'src/bussiness/ports/input/services/i-user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: IUserService) {}
}
