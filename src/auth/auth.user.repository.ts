import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserById(userId: string) {
    return this.userRepository.findOne({
      where: { userId },
    });
  }
}
