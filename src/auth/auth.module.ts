import { Module } from '@nestjs/common';
import { JwtModule } from 'src/jwt/jwt.module';

import { AuthGuard } from './auth.guard';
import { AuthUserRepository } from './auth.user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.orm.entity';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [AuthGuard, AuthUserRepository],
  exports: [AuthGuard, JwtModule, AuthUserRepository],
})
export class AuthModule {}
