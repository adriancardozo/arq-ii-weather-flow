import { Controller } from '@nestjs/common';
import { IUserService } from 'src/bussiness-logic/service/interface/i-user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: IUserService) {}
}
