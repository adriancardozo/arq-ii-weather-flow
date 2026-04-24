import { Controller } from '@nestjs/common';
import { IMeasurementService } from 'src/bussiness-logic/service/interface/i-measurement.service';

@Controller()
export class MeasurementController {
  constructor(private readonly measurementService: IMeasurementService) {}
}
