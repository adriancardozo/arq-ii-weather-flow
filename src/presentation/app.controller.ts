import { Controller, Get } from '@nestjs/common';
import { IAppService } from 'src/bussiness-logic/service/interface/i-app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: IAppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
