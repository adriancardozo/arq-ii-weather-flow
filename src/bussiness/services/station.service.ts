import { Injectable } from '@nestjs/common';
import { IStationService } from '../ports/input/services/i-station.service';
import { IStationRepository } from '../ports/output/repositories/i-station.repository';

@Injectable()
export class StationService implements IStationService {
  constructor(private readonly stationRepository: IStationRepository) {}
}
