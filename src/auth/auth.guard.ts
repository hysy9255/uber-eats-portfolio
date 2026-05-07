import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/constants/userRole';
import { AUTH_USER } from 'src/constants/variables';
import { ClientRepository } from 'src/client/repository/client.repository';
import { OwnerRepository } from 'src/owner/repository/owner.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly clientRepo: ClientRepository,
    private readonly ownerRepo: OwnerRepository,
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
      const client = await this.clientRepo.findOnebyUserId(userId);
      if (!client) throw new Error('Client not found');
      const { clientId } = client;
      req[AUTH_USER] = { userId, role, clientId };
    } else if (role === UserRole.Owner) {
      const owner = await this.ownerRepo.findOnebyUserId(userId);
      if (!owner) throw new Error('Owner not found');
      const { ownerId } = owner;
      req[AUTH_USER] = { userId, role, ownerId };
    }

    // req[AUTH_USER] = { userId, role };

    return true;
  }
}
