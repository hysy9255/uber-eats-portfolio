import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { UserRegistrationService } from './service/user.registration.service';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { UserMapper } from './mapper/user.mapper';

@Module({
  imports: [BcryptModule],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserRegistrationService],
  exports: [UserRegistrationService],
})
export class UserModule {}
