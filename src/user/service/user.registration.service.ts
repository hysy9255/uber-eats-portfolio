import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from '../dto/request/create-user.dto';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRegistrationService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async create(dto: CreateUserDTO): Promise<{ userId: string }> {
    const user = await this.userRepo.findOneByEmail(dto.email);
    if (user) {
      throw new Error(`User with email ${dto.email} already exists`);
    }
    const createUserData = await this.userMapper.dtoToCreateData(dto);
    return await this.userRepo.save(createUserData);
  }
}
