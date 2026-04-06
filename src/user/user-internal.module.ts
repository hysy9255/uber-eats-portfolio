import { Module } from '@nestjs/common';
import { UserInternalService } from './service/user.internal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.orm.entity';
import { UserMapper } from './user.mapper';
import { UserRepository } from './repository/user.repository';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BcryptModule],
  providers: [UserInternalService, UserMapper, UserRepository],
  exports: [UserInternalService],
})
export class UserInternalModule {}
