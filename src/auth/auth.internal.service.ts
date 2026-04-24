import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthInternalService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getClientByUserId(userId: string): Promise<{ clientId: string }> {
    const row = await this.userRepo
      .createQueryBuilder('user')
      .leftJoin('user.clients', 'clients')
      .select(['clients.clientId as "clientId"'])
      .where('user.userId = :userId', { userId })
      .getRawOne<{ clientId: string }>();

    if (!row) throw new NotFoundException(`Client does not exist`);
    return row;
  }

  async getOwnerByUserId(userId: string): Promise<{ ownerId: string }> {
    const row = await this.userRepo
      .createQueryBuilder('user')
      .leftJoin('user.owners', 'owners')
      .select(['owners.ownerId as "ownerId"'])
      .where('user.userId = :userId', { userId })
      .getRawOne<{ ownerId: string }>();

    if (!row) throw new NotFoundException(`Owner does not exist`);
    return row;
  }
}
