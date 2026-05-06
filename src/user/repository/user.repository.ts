import { Injectable } from '@nestjs/common';
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
    const user = await this.repo.save(this.repo.create(data));
    return { userId: user.userId };
  }

  async updateUser(data: UpdateUserData) {
    await this.repo.save(this.repo.create(data));
  }

  deleteUser(userId: string) {
    return this.repo.delete({ userId });
  }

  async findOneById(userId: string): Promise<ReadUserData | undefined> {
    return await this.baseReadQb()
      .where('u.userId = :userId', { userId })
      .getRawOne<ReadUserData>();
  }

  async findOneByEmail(email: string): Promise<ReadUserData | undefined> {
    return await this.baseReadQb()
      .where('u.email = :email', { email })
      .getRawOne<ReadUserData>();
  }

  private baseReadQb(): SelectQueryBuilder<UserEntity> {
    return this.repo
      .createQueryBuilder('u')
      .select([
        'u.userId as "userId"',
        'u.email as email',
        'u.password as password',
        'u.role as role',
        'u.name as name',
        'u.phoneNumber as "phoneNumber"',
        'u.profileImgUrl as "profileImgUrl"',
      ]);
  }
}
