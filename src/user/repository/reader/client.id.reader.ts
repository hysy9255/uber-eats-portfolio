import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../orm-entities/client.orm.entity';

@Injectable()
export class ClientIdReader {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async getClientIdByUserId(userId: string): Promise<string | null> {
    const result = await this.clientRepository
      .createQueryBuilder('client')
      .where('client.userId = :userId', { userId })
      .select(['client.clientId'])
      .getRawOne<{ clientId: string }>();

    return result?.clientId ?? null;
  }
}
