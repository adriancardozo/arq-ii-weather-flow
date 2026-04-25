import { Controller } from '@nestjs/common';
import { IMeasurementService } from 'src/bussiness/ports/input/services/i-measurement.service';

@Controller('measurement')
export class MeasurementController {
  constructor(private readonly measurementService: IMeasurementService) {}
}
