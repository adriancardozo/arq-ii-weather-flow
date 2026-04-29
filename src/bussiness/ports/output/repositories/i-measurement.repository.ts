import { Measurement } from 'src/bussiness/entities/measurement.entity';
import { IRepository } from './i.respository';
import { RegisterMeasurementInput } from '../../input/services/dtos/input/register-measurement.input';
import { EditMeasurementInput } from '../../input/services/dtos/input/edit-measurement.input';

export abstract class IMeasurementRepository<Session = any> extends IRepository<
  Measurement,
  RegisterMeasurementInput,
  EditMeasurementInput,
  Session
> {}
