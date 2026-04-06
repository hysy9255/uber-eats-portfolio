import { Global, Module } from '@nestjs/common';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { AuthExternalService } from './auth.external.service';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { UserInternalModule } from 'src/user/user-internal.module';

@Global()
@Module({
  imports: [BcryptModule, JwtModule, UserInternalModule],
  controllers: [AuthController],
  providers: [AuthGuard, AuthExternalService],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
