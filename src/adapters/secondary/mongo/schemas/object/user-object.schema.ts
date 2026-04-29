import { User as UserEntity } from 'src/bussiness/entities/user.entity';
import { Station } from './station-object.schema';
import { Type } from 'class-transformer';

export class User extends UserEntity {
  @Type(() => Station)
  declare stations: Array<Station>;
}
