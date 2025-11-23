import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdatePasswordInput,
  UpdateUserInput,
} from '../dto/user-input';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../dto/user-output';
import { LoginInput } from '../dto/login-input';
import { JwtService } from 'src/jwt/jwt.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { SharedService } from 'src/shared/shared.service';
import { ClientRepository } from '../repository/client.repository';
import { DriverRepository } from '../repository/driver.repository';
import { OwnerRepository } from '../repository/owner.repository';
import { CustomerRepository } from '../repository/\bcustomer.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
    private readonly customerRepository: CustomerRepository,
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
    const token = this.jwtService.signToken(user.userId, user.role);

    return { token, role: user.role };
  }

  async getOwnerId(userId: string): Promise<string> {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('OwnerId is not found');
    }
    return ownerId;
  }

  async createUser({
    email,
    password,
    role,
    name,
    phoneNumber,
    profileImgUrl,
  }: CreateUserInput) {
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
      name,
      phoneNumber,
      profileImgUrl,
    );
    return userId;
  }

  async getUser(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    // return new UserOutput(user.userId, user.email, user.role);
    return user;
  }

  async updateUserInfo(
    myUserId: string,
    { phoneNumber, profileImgUrl }: UpdateUserInput,
  ) {
    const me = await this.userRepository.getUserById(myUserId);
    if (!me) {
      throw new Error(`User with ID ${myUserId} not found`);
    }

    await this.userRepository.updateUserInfo(
      me.userId,
      phoneNumber,
      profileImgUrl,
    );
  }

  async updatePassword(
    myUserId: string,
    { password, newPassword }: UpdatePasswordInput,
  ) {
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

  async createOwner(userId: string): Promise<string> {
    const ownerId = this.sharedService.generateId();
    await this.ownerRepository.saveOwner(userId, ownerId);
    return ownerId;
  }

  async createClient(userId: string) {
    await this.clientRepository.saveClient(
      userId,
      this.sharedService.generateId(),
    );
  }

  async createDriver(userId: string): Promise<string> {
    const driverId = this.sharedService.generateId();
    await this.driverRepository.saveDriver(userId, driverId);
    return driverId;
  }

  async createCustomer(
    userId: string,
    deliveryAddress: string,
    deliveryNotes: string,
  ) {
    await this.customerRepository.saveClient(
      userId,
      this.sharedService.generateId(),
      deliveryAddress,
      deliveryNotes,
    );
  }
}
