import { Injectable } from '@nestjs/common';
import { IMeasurementService } from '../ports/input/services/i-measurement.service';
import { IMeasurementRepository } from '../ports/output/repositories/i-measurement.repository';

@Injectable()
export class MeasurementService implements IMeasurementService {
  constructor(private readonly measurementRepository: IMeasurementRepository) {}
}
