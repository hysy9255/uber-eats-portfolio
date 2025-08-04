import { PickType } from '@nestjs/mapped-types';
import { UserRole } from './user-output';

export class CreateUserInput {
  email: string;
  password: string;
  role: UserRole;
}

export class UpdateUserInput extends PickType(CreateUserInput, ['password']) {
  newPassword: string;
}

export class DeleteUserInput extends PickType(CreateUserInput, ['password']) {}
