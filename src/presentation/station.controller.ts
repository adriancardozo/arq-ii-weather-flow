import { Controller } from '@nestjs/common';
import { IStationService } from 'src/bussiness-logic/service/interface/i-station.service';

@Controller()
export class StationController {
  constructor(private readonly stationService: IStationService) {}
}
