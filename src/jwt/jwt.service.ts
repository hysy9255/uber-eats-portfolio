import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface AccessTokenPayload extends jwt.JwtPayload {
  userId: string;
}

@Injectable()
export class JwtService {
  signToken(userId: string) {
    return jwt.sign({ userId: userId }, 'this.privateKey');
  }

  verifyToken(token: string) {
    const decoded = jwt.verify(token, 'this.privateKey');
    return decoded as AccessTokenPayload;
  }
}
