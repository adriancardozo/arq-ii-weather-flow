import { Injectable } from '@nestjs/common';
import { IMeasurementService } from '../ports/input/services/i-measurement.service';
import { IMeasurementRepository } from '../ports/output/repositories/i-measurement.repository';
import { Service } from './service';
import { Measurement } from '../entities/measurement.entity';
import { EditMeasurementInput } from '../ports/input/services/dtos/input/edit-measurement.input';
import { RegisterMeasurementInput } from '../ports/input/services/dtos/input/register-measurement.input';
import { ITransactionService } from '../ports/output/services/i-transaction.service';
import { IUserRepository } from '../ports/output/repositories/i-user.repository';
import { IStationRepository } from '../ports/output/repositories/i-station.repository';

@Injectable()
export class MeasurementService<Session = any>
  extends Service<Measurement, RegisterMeasurementInput | Measurement, EditMeasurementInput, Session>
  implements IMeasurementService
{
  constructor(
    measurementRepository: IMeasurementRepository,
    transactionService: ITransactionService,
    private readonly userRepository: IUserRepository,
    private readonly stationRepository: IStationRepository,
  ) {
    super(measurementRepository, transactionService);
  }

  override async create(input: RegisterMeasurementInput, session?: Session): Promise<Measurement> {
    return await this.transactionService.transaction(async (session) => {
      const station = await this.stationRepository.findOneByOrFail({ id: input.station }, session);
      const measurement = await this.repository.save(
        new Measurement(undefined, input.pressure, input.temperature, input.humidity, station),
        session,
      );
      station.addMeasurement(measurement);
      await this.stationRepository.updateOne(station, session);
      await this.userRepository.updateMany(station.subscribers);
      return measurement;
    }, session);
  }
}
