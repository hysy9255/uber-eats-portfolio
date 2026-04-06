import { Global, Module } from '@nestjs/common';
import { JwtMiddleWare } from './jwt.middleware';
import { JwtService } from './jwt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [JwtMiddleWare, JwtService],
  exports: [JwtService],
})
export class JwtModule {}
