import { PickType } from '@nestjs/mapped-types';
import { UserRole } from './user-output';

export class CreateUserInput {
  email: string;
  password: string;
  role: UserRole;
}

export class UpdateUserInput extends PickType(CreateUserInput, [
  'email',
  'password',
]) {
  newPassword: string;
}
