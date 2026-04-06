import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.orm.entity';
import { Repository } from 'typeorm';
import { ReadUserData } from '../types/read-user-data';
import { AddUserData } from '../types/add-user-data';
import { UpdateUserData } from '../types/update-user-data';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // done
  async addUser(data: AddUserData): Promise<{ userId: string }> {
    const user = await this.userRepository.save(
      this.userRepository.create(data),
    );
    return { userId: user.userId };
  }

  // done
  async getUserById(userId: string): Promise<ReadUserData> {
    const row = await this.userRepository
      .createQueryBuilder('u')
      .select([
        'u.userId as "userId"',
        'u.email as email',
        'u.password as password',
        'u.role as role',
        'u.name as name',
        'u.phoneNumber as "phoneNumber"',
        'u.profileImgUrl as "profileImgUrl"',
      ])
      .where('u.userId = :userId', { userId })
      .getRawOne<ReadUserData>();

    if (!row) throw new NotFoundException(`User does not exist`);
    return row;
  }

  async getUserByEmail(email: string): Promise<ReadUserData> {
    const row = await this.userRepository
      .createQueryBuilder('u')
      .select([
        'u.userId as "userId"',
        'u.email as email',
        'u.password as password',
        'u.role as role',
        'u.name as name',
        'u.phoneNumber as "phoneNumber"',
        'u.profileImgUrl as "profileImgUrl"',
      ])
      .where('u.email = :email', { email })
      .getRawOne<ReadUserData>();

    if (!row) throw new NotFoundException(`User does not exist`);

    return row;
  }

  async checkEmailAvailability(email: string): Promise<{ available: boolean }> {
    const row = await this.userRepository
      .createQueryBuilder('u')
      .select(['u.userId as "userId"'])
      .where('u.email = :email', { email })
      .getRawOne();

    return { available: !row };
  }

  // done
  async updateUser(data: UpdateUserData) {
    await this.userRepository.save(this.userRepository.create(data));
  }

  // done
  deleteUser(userId: string) {
    return this.userRepository.delete({ userId });
  }

  // done
  async existsByEmail(email: string): Promise<boolean> {
    const row = await this.userRepository
      .createQueryBuilder('u')
      .select('1')
      .where('u.email = :email', { email })
      .limit(1)
      .getRawOne();

    return !!row;
  }
}
