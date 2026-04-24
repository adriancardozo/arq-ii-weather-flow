import { Module } from '@nestjs/common';
import { AppController } from './presentation/app.controller';
import { AppService } from './bussiness-logic/service/app.service';
import { IAppService } from './bussiness-logic/service/interface/i-app.service';
import { IUserService } from './bussiness-logic/service/interface/i-user.service';
import { IStationService } from './bussiness-logic/service/interface/i-station.service';
import { IMeasurementService } from './bussiness-logic/service/interface/i-measurement.service';
import { MongoMeasurementRepository } from './data-access/mongo-measurement.repository';
import { MongoStationRepository } from './data-access/mongo-station.repository';
import { MongoUserRepository } from './data-access/mongo-user.repository';
import { IMeasurementRepository } from './bussiness-logic/repository/interface/i-measurement.repository';
import { IStationRepository } from './bussiness-logic/repository/interface/i-station.repository';
import { IUserRepository } from './bussiness-logic/repository/interface/i-user.repository';
import { MeasurementService } from './bussiness-logic/service/measurement.service';
import { StationService } from './bussiness-logic/service/station.service';
import { UserService } from './bussiness-logic/service/user.service';
import { AuthController } from './presentation/auth.controller';
import { MeasurementController } from './presentation/measurement.controller';
import { StationController } from './presentation/station.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, MeasurementController, StationController],
  providers: [
    AppService,
    { provide: IAppService, useExisting: AppService },
    MeasurementService,
    { provide: IMeasurementService, useExisting: MeasurementService },
    StationService,
    { provide: IStationService, useExisting: StationService },
    UserService,
    { provide: IUserService, useExisting: UserService },
    MongoMeasurementRepository,
    { provide: IMeasurementRepository, useExisting: MongoMeasurementRepository },
    MongoStationRepository,
    { provide: IStationRepository, useExisting: MongoStationRepository },
    MongoUserRepository,
    { provide: IUserRepository, useExisting: MongoUserRepository },
  ],
})
export class AppModule {}
