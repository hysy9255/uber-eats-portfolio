import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserRole } from 'src/user/dto/user-output';

export interface AccessTokenPayload extends jwt.JwtPayload {
  userId: string;
  role: UserRole;
}

@Injectable()
export class JwtService {
  signToken(userId: string, role: UserRole) {
    return jwt.sign({ userId, role }, 'this.privateKey');
  }

  verifyToken(token: string) {
    const decoded = jwt.verify(token, 'this.privateKey');
    return decoded as AccessTokenPayload;
  }
}
