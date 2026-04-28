import { EditUserInput } from '../ports/input/services/dtos/input/edit-user.input';
import { LoginInput } from '../ports/input/services/dtos/input/login.input';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(id: string, firstName: string, lastName: string, email: string, password: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
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
