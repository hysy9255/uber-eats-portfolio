import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../dto/user-input';
import { UserRepository } from '../repository/user.repository';
import { v4 as uuidv4 } from 'uuid';

import { UserOutput, UserRole } from '../dto/user-output';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser({ email, password, role }: CreateUserInput) {
    await this.userRepository.saveUser(
      uuidv4(),
      email,
      await this.authService.hashPassword(password),
      role,
    );
  }

  async getUser(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return new UserOutput(user.userId, user.email, user.role);
  }

  async updateMe(myUserId: string, { password, newPassword }: UpdateUserInput) {
    const me = await this.userRepository.getUserById(myUserId);
    if (!me) {
      throw new Error(`User with ID ${myUserId} not found`);
    }
    await this.authService.comparePassword(password, me.password);
    await this.userRepository.saveUser(
      me.userId,
      me.email,
      await this.authService.hashPassword(newPassword),
      UserRole[me.role] as UserRole,
    );
  }

  async deleteMe(myUserId: string, { password }: DeleteUserInput) {
    const me = await this.userRepository.getUserById(myUserId);
    if (!me) {
      throw new Error(`User with ID ${myUserId} not found`);
    }
    await this.authService.comparePassword(password, me.password);
    await this.userRepository.deleteUser(myUserId);
  }
}
