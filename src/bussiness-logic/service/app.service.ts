import { Injectable } from '@nestjs/common';
import { IAppService } from './interface/i-app.service';

@Injectable()
export class AppService implements IAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
