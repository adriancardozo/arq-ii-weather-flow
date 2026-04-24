import { Injectable } from '@nestjs/common';
import { IStationService } from './interface/i-station.service';
import { IStationRepository } from '../repository/interface/i-station.repository';

@Injectable()
export class StationService implements IStationService {
  constructor(private readonly stationRepository: IStationRepository) {}
}
