import { UserRole } from './user-output';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateUserInput {
  @ApiProperty({ example: 'owner@gmail.com', description: 'email' })
  email: string;
  @ApiProperty({ example: '1234', description: 'password' })
  password: string;
  @ApiProperty({ example: 'owner', description: 'user role' })
  role: UserRole;
}

export class UpdateUserInput extends PickType(CreateUserInput, ['password']) {
  @ApiProperty({ example: '12345', description: 'new password' })
  newPassword: string;
}

export class DeleteUserInput extends PickType(CreateUserInput, ['password']) {}
