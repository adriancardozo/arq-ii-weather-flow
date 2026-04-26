import { Controller } from '@nestjs/common';
import { IStationService } from 'src/bussiness/ports/input/services/i-station.service';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: IStationService) {}
}
