import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtMiddleWare } from './jwt.middleware';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [JwtMiddleWare],
  exports: [],
})
export class JwtModule {}
