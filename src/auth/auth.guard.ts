import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
// import { AuthUserRepository } from './auth.user.repository';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/dto/user-output';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly authUserRepository: AuthUserRepository,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
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

    req['authUser'] = { userId, role };

    return true;

    // const user = await this.authUserRepository.getUserById(userId);
    // if (!user) {
    //   return false;
    // }
    // req['authUser'] = user;

    // return true;
  }
}
