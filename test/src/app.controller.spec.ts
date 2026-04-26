import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/adapters/primary/http/controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration/configuration';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthCheck()).toBe('Hello World!');
    });
  });
});
