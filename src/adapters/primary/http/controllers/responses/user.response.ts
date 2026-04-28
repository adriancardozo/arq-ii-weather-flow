import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/bussiness/entities/user.entity';

export class UserResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.first_name = user.firstName;
    this.last_name = user.lastName;
    this.email = user.email;
  }
}
