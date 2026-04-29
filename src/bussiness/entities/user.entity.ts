import { EditUserInput } from '../ports/input/services/dtos/input/edit-user.input';
import { LoginInput } from '../ports/input/services/dtos/input/login.input';
import { IEntity } from './i.entity';
import { Station } from './station.entity';

export class User extends IEntity<EditUserInput> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  stations: Array<Station> = [];

  constructor(id: string);
  constructor(id: string, firstName: string, lastName: string, email: string, password: string);
  constructor(id: string, firstName?: string, lastName?: string, email?: string, password?: string) {
    super();
    this.id = id;
    if (firstName && lastName && email && password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }
  }

  edit({ firstName, lastName, email }: EditUserInput) {
    this.firstName = firstName ?? this.firstName;
    this.lastName = lastName ?? this.lastName;
    this.email = email ?? this.email;
  }

  loginInput(): LoginInput {
    return new LoginInput(this.id, this.email);
  }
}
