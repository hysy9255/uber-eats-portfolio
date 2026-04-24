import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/constants/userRole';
import { AUTH_USER } from 'src/constants/variables';
import { AuthInternalService } from './auth.internal.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthInternalService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const required = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) return true;

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['jwt-token'] as string | undefined;

    if (!token) {
      return false;
    }

    const { userId, role } = this.jwtService.verifyToken(token);

    if (role === UserRole.Client) {
      const { clientId } = await this.authService.getClientByUserId(userId);
      req[AUTH_USER] = { userId, role, clientId };
    } else if (role === UserRole.Owner) {
      const { ownerId } = await this.authService.getOwnerByUserId(userId);
      req[AUTH_USER] = { userId, role, ownerId };
    }

    // req[AUTH_USER] = { userId, role };

    return true;
  }
}
