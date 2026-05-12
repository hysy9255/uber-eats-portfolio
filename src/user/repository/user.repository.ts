import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../orm-entity/user.orm.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ReadUserData } from '../types/read-user-data';
import { UpdateUserData } from '../types/update-user-data';
import { CreateUserData } from '../types/create-user-data';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async save(data: CreateUserData): Promise<{ userId: string }> {
    try {
      const user = await this.repo.save(this.repo.create(data));
      return { userId: user.userId };
    } catch (e) {
      console.error('Error saving user:', e);
      throw new InternalServerErrorException('Failed to save user');
    }
  }

  async updateUser(data: UpdateUserData) {
    try {
      await this.repo.save(this.repo.create(data));
    } catch (e) {
      console.error('Error updating user:', e);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  deleteUser(userId: string) {
    try {
      return this.repo.delete({ userId });
    } catch (e) {
      console.error('Error deleting user:', e);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async findOneById(userId: string): Promise<ReadUserData | undefined> {
    try {
      return await this.baseReadQb()
        .where('u.userId = :userId', { userId })
        .getRawOne<ReadUserData>();
    } catch (e) {
      console.error('Error finding user by ID:', e);
      throw new InternalServerErrorException('Failed to find user by ID');
    }
  }

  async findOneByEmail(email: string): Promise<ReadUserData | undefined> {
    try {
      return await this.baseReadQb()
        .where('u.email = :email', { email })
        .getRawOne<ReadUserData>();
    } catch (e) {
      console.error('Error finding user by email:', e);
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }

  private baseReadQb(): SelectQueryBuilder<UserEntity> {
    return this.repo
      .createQueryBuilder('u')
      .select([
        'u.userId as "userId"',
        'u.email as "email"',
        'u.password as "password"',
        'u.role as "role"',
        'u.name as "name"',
        'u.phoneNumber as "phoneNumber"',
        'u.profileImgUrl as "profileImgUrl"',
      ]);
  }
}
