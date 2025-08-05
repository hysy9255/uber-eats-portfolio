import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.orm.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../dto/user-output';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(userId: string, email: string, password: string, role: UserRole) {
    const user = this.userRepository.create({ userId, email, password, role });
    return this.userRepository.save(user);
  }

  async getUser(userId: string) {
    console.log(userId);
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    console.log(user);
    return user;
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  //   getMe() {}
  //   updateMe() {}
  //   deleteMe() {}
}
