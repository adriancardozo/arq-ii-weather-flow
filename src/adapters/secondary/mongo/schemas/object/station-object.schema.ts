import { Station as StationEntity } from 'src/bussiness/entities/station.entity';
import { User } from './user-object.schema';
import { Type } from 'class-transformer';
import { Location } from 'src/bussiness/value-objects/location.value-object';

export class Station extends StationEntity {
  @Type(() => Location)
  declare location: Location;

  @Type(() => User)
  declare owner: User;
}
