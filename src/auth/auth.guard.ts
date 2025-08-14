import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthUserRepository } from './auth.user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authUserRepository: AuthUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['jwt-token'] as string | undefined;

    if (!token) {
      return false;
    }
    const { userId } = this.jwtService.verifyToken(token);
    const user = await this.authUserRepository.getUserById(userId);
    if (!user) {
      return false;
    }
    req['authUser'] = user;

    return true;
  }
}
