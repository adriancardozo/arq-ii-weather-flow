import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/infrastructure/configuration/configuration';
import { AuthService } from 'src/bussiness/services/auth.service';
import { mock } from 'test/resources/mocks/mock';
import { ITransactionService } from 'src/bussiness/ports/output/services/i-transaction.service';
import { MockTransactionService } from 'test/resources/mocks/bussiness/ports/output/services/mock-transaction.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
      providers: [AuthService, { provide: ITransactionService, useClass: MockTransactionService }],
    })
      .useMocker(mock)
      .compile();

    authService = app.get<AuthService>(AuthService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authService).toBeDefined();
    });
  });
});
