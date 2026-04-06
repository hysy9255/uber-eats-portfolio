import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.orm.entity';
import { UserExternalService } from './service/user.external.service';
import { UserMapper } from 'src/user/user.mapper';
import { UserRepository } from './repository/user.repository';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BcryptModule],
  controllers: [UserController],
  providers: [UserExternalService, UserMapper, UserRepository],
})
export class UserModule {}
