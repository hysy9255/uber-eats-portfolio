import { Global, Module } from '@nestjs/common';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { AuthExternalService } from './auth.external.service';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { UserInternalModule } from 'src/user/user-internal.module';
import { AuthInternalService } from './auth.internal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.orm.entity';

@Global()
@Module({
  imports: [
    BcryptModule,
    JwtModule,
    UserInternalModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, AuthExternalService, AuthInternalService],
  exports: [AuthGuard, JwtModule, AuthInternalService],
})
export class AuthModule {}
