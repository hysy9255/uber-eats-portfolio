import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../dto/user-input';

@Injectable()
export class UserService {
  constructor() {}

  createUser({ email, password, role }: CreateUserInput) {
    console.log(email, password, role);
  }

  getUser(userId: string) {
    console.log(userId);
  }

  getMe() {}

  updateMe({ password, newPassword }: UpdateUserInput) {
    console.log(password, newPassword);
  }

  deleteMe({ password }: DeleteUserInput) {
    console.log(password);
  }
}
