import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../dto/user-input';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { UserOutput, UserRole } from '../dto/user-output';
import { LoginInput } from '../dto/login-input';
import { JwtService } from 'src/jwt/jwt.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { SharedService } from 'src/shared/shared.service';
import { ClientRepository } from '../repository/client.repository';
import { DriverRepository } from '../repository/driver.repository';
import { OwnerRepository } from '../repository/owner.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
    private readonly driverRepository: DriverRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginInput) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    await this.bcryptService.comparePassword(password, user.password);
    const token = this.jwtService.signToken(user.userId);

    return { token };
  }

  async createUser({ email, password, role }: CreateUserInput) {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }
    if (!Object.values(UserRole).includes(role)) {
      throw new Error(`Invalid user role: ${role}`);
    }
    const { userId } = await this.userRepository.saveUser(
      this.sharedService.generateId(),
      email,
      await this.bcryptService.hashPassword(password),
      role,
    );
    return userId;
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

    await this.bcryptService.comparePassword(password, me.password);

    await this.userRepository.saveUser(
      me.userId,
      me.email,
      await bcrypt.hash(newPassword, 10),
      UserRole[me.role] as UserRole,
    );
  }

  async deleteMe(myUserId: string, { password }: DeleteUserInput) {
    const me = await this.userRepository.getUserById(myUserId);
    if (!me) {
      throw new Error(`User with ID ${myUserId} not found`);
    }
    await this.bcryptService.comparePassword(password, me.password);
    await this.userRepository.deleteUser(myUserId);
  }

  async createOwner(userId: string) {
    await this.ownerRepository.saveOwner(
      userId,
      this.sharedService.generateId(),
    );
  }

  async createClient(userId: string) {
    await this.clientRepository.saveClient(
      userId,
      this.sharedService.generateId(),
    );
  }

  async createDriver(userId: string) {
    await this.driverRepository.saveDriver(
      userId,
      this.sharedService.generateId(),
    );
  }
}
