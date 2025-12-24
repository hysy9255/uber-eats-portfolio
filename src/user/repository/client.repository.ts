import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../orm-entities/client.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async saveClient(userId: string, clientId: string, deliveryAddress: string) {
    await this.clientRepository.save(
      this.clientRepository.create({ userId, clientId, deliveryAddress }),
    );
  }

  async getClientByUserId(userId: string) {
    return await this.clientRepository
      .createQueryBuilder('client')
      .where('client.userId = :userId', { userId })
      .getOne();
  }

  async getClientIdByUserId(userId: string) {
    const row = await this.clientRepository
      .createQueryBuilder('c')
      .select('c.clientId', 'clientId')
      .where('c.userId = :userId', { userId })
      .getRawOne<{ clientId: string }>();

    return row?.clientId ?? null;
  }
}
