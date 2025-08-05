import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/user/service/auth.service';

@Injectable()
export class JwtMiddleWare implements NestMiddleware {
  constructor(private readonly authSerivce: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['jwt-token'] as string | undefined;

    if (token) {
      const verified = this.authSerivce.verifyToken(token);

      if (verified) {
        req['userId'] = verified['id'] as string;
      }
    }
    next();
  }
}
