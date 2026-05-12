import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../orm-entity/client.orm.entity';
import { Repository } from 'typeorm';
import { ReadClientInfoData } from '../types/read-client-info.data';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async save(userId: string, clientId: string) {
    try {
      await this.clientRepository.save(
        this.clientRepository.create({ userId, clientId }),
      );
    } catch (e) {
      console.error('Error saving client:', e);
      throw new InternalServerErrorException(
        'Failed to save client information',
      );
    }
  }

  async findOnebyUserId(userId: string) {
    return await this.clientRepository
      .createQueryBuilder('c')
      .select(['c.clientId as "clientId"'])
      .where('c.userId = :userId', { userId })
      .getRawOne<{ clientId: string }>();
  }

  async findOneByUser(userId: string): Promise<{ clientId: string }> {
    const row = await this.clientRepository
      .createQueryBuilder('c')
      .select(['c.clientId AS "clientId"'])
      .where('c.userId = :userId', { userId })
      .getRawOne<{ clientId: string }>();

    if (!row) throw new Error('Client Not Found');
    return row;
  }

  async findClientInfoByIds(
    clientIds: string[],
  ): Promise<ReadClientInfoData[]> {
    return await this.clientRepository
      .createQueryBuilder('c')
      .leftJoin('c.user', 'u')
      .select([
        'c.clientId AS "clientId"',
        'u.name AS name',
        'u.phoneNumber AS "phoneNumber"',
      ])
      .where('c.clientId IN (:...clientIds)', { clientIds })
      .getRawMany<ReadClientInfoData>();
  }
}
