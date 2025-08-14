import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class JwtMiddleWare implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    // const token = req.headers['jwt-token'] as string | undefined;
    // if (token) req['authorization'] = token;
    next();
  }
}
