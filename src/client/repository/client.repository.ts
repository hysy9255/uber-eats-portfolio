import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../orm-entity/client.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repo: Repository<ClientEntity>,
  ) {}

  async save(userId: string, clientId: string) {
    try {
      await this.repo.save(this.repo.create({ userId, clientId }));
    } catch (e) {
      console.error('Error saving client:', e);
      throw new InternalServerErrorException(
        'Failed to save client information',
      );
    }
  }

  async findOnebyUserId(
    userId: string,
  ): Promise<{ clientId: string } | undefined> {
    try {
      return await this.repo
        .createQueryBuilder('c')
        .select(['c.clientId as "clientId"'])
        .where('c.userId = :userId', { userId })
        .getRawOne<{ clientId: string }>();
    } catch (e) {
      console.error('Error finding client by userId:', e);
      throw new InternalServerErrorException(
        'Failed to retrieve client information',
      );
    }
  }
}
