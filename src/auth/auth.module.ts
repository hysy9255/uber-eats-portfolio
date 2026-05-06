import { Global, Module } from '@nestjs/common';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [BcryptModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
