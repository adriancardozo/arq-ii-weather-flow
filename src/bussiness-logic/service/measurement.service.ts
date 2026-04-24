import { Injectable } from '@nestjs/common';
import { IMeasurementService } from './interface/i-measurement.service';
import { IMeasurementRepository } from '../repository/interface/i-measurement.repository';

@Injectable()
export class MeasurementService implements IMeasurementService {
  constructor(private readonly measurementRepository: IMeasurementRepository) {}
}
