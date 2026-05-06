import { Module } from '@nestjs/common';
import { JwtMiddleWare } from './jwt.middleware';
import { JwtService } from './jwt.service';

@Module({
  providers: [JwtMiddleWare, JwtService],
  exports: [JwtService],
})
export class JwtModule {}
