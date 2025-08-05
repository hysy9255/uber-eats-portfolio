import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../dto/user-input';
import { UserRepository } from '../repository/user.repository';
import { v4 as uuidv4 } from 'uuid';

import { UserOutput } from '../dto/user-output';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser({ email, password, role }: CreateUserInput) {
    const hashedPassword = await this.authService.hashPassword(password);
    await this.userRepository.createUser(uuidv4(), email, hashedPassword, role);
  }

  async getUser(userId: string) {
    const user = await this.userRepository.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return new UserOutput(user.userId, user.email, user.role);
  }

  updateMe({ password, newPassword }: UpdateUserInput) {
    console.log(password, newPassword);
  }

  deleteMe({ password }: DeleteUserInput) {
    console.log(password);
  }
}
