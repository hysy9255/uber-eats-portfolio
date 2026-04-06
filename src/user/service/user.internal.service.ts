import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserMapper } from 'src/user/user.mapper';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ReadUserData } from '../types/read-user-data';

@Injectable()
export class UserInternalService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  // done
  async create(dto: CreateUserDTO): Promise<{ userId: string }> {
    const emailAvailable = await this.userRepository.checkEmailAvailability(
      dto.email,
    );
    if (!emailAvailable) {
      throw new Error(`User with email ${dto.email} already exists`);
    }
    const addUserData =
      await this.userMapper.createUserRequestDtoToAddUserData(dto);
    const { userId } = await this.userRepository.addUser(addUserData);
    return { userId };
  }

  // done
  async getByEmail(email: string): Promise<ReadUserData> {
    return await this.userRepository.getUserByEmail(email);
  }
}
