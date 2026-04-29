import { EditStationInput } from '../ports/input/services/dtos/input/edit-station.input';
import { IEntity } from './i.entity';
import { User } from './user.entity';
import { Location } from '../value-objects/location.value-object';

export class Station extends IEntity<EditStationInput> {
  name: string;
  location: Location;
  sensorModel: string;
  state: 'active' | 'inactive' = 'active';
  owner: User;

  constructor(id: string);
  constructor(
    id: string,
    name: string,
    location: Location,
    sensorModel: string,
    owner: User,
    state: 'active' | 'inactive',
  );
  constructor(
    id: string,
    name?: string,
    location?: Location,
    sensorModel?: string,
    owner?: User,
    state: 'active' | 'inactive' = 'active',
  ) {
    super();
    this.id = id;
    if (name && location && sensorModel && owner) {
      this.name = name;
      this.location = location;
      this.sensorModel = sensorModel;
      this.owner = owner;
      this.state = state;
    }
  }

  edit({ name, location, sensorModel, state, owner }: EditStationInput) {
    this.name = name ?? this.name;
    if (location) this.location.edit(location);
    this.sensorModel = sensorModel ?? this.sensorModel;
    this.state = state ?? this.state;
    if (owner?.id) this.owner = new User(owner.id);
  }
}
