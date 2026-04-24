import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from 'src/bussiness-logic/service/app.service';
import { IAppService } from 'src/bussiness-logic/service/interface/i-app.service';
import { AppController } from 'src/presentation/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: IAppService, useExisting: AppService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
