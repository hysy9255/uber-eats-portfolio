import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.orm.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../dto/user-output';
import { OwnerEntity } from '../orm-entities/owner.orm.entity';
import { ClientEntity } from '../orm-entities/client.orm.entity';
import { DriverEntity } from '../orm-entities/driver.orm.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>,
  ) {}

  async updateUserInfo(
    userId: string,
    phoneNumber?: string,
    profileImgUrl?: string,
  ) {
    return await this.userRepository.save(
      this.userRepository.create({
        userId,
        phoneNumber,
        profileImgUrl,
      }),
    );
  }

  async saveUser(
    userId: string,
    email: string,
    password: string,
    role: UserRole,
    name?: string,
    phoneNumber?: string,
    profileImgUrl?: string,
  ) {
    return await this.userRepository.save(
      this.userRepository.create({
        userId,
        email,
        password,
        role,
        name,
        phoneNumber,
        profileImgUrl,
      }),
    );
  }

  async getUserById(userId: string): Promise<UserEntity | undefined> {
    const result: UserEntity[] = await this.userRepository.query(
      'SELECT * FROM users WHERE "userId" = $1',
      [userId],
    );

    return result[0];
  }

  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    const result: UserEntity[] = await this.userRepository.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    return result[0];
  }

  deleteUser(userId: string) {
    return this.userRepository.delete({ userId });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const row = await this.userRepository
      .createQueryBuilder('user')
      .select('1')
      .where('user.email = :email', { email })
      .limit(1)
      .getRawOne();

    return !!row;
  }
}
