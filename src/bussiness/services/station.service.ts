import { Injectable } from '@nestjs/common';
import { IStationService } from '../ports/input/services/i-station.service';
import { IStationRepository } from '../ports/output/repositories/i-station.repository';
import { Station } from '../entities/station.entity';
import { CreateStationInput } from '../ports/input/services/dtos/input/create-station.input';
import { EditStationInput } from '../ports/input/services/dtos/input/edit-station.input';
import { ITransactionService } from '../ports/output/services/i-transaction.service';
import { Service } from './service';

@Injectable()
export class StationService<Session = any>
  extends Service<Station, CreateStationInput, EditStationInput, Session>
  implements IStationService
{
  constructor(stationRepository: IStationRepository, transactionService: ITransactionService) {
    super(stationRepository, transactionService);
  }
}
