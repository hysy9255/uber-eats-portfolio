import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../orm-entity/client.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientAggregateRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findClientAggregate(clientId: string): Promise<{
    clientId: string;
    deliveryAddressId: string;
  }> {
    const row = await this.clientRepository
      .createQueryBuilder('c')
      .leftJoin('c.deliveryAddress', 'd')
      .select([
        'c.clientId AS "clientId"',
        'd.deliveryAddressId AS "deliveryAddressId"',
      ])
      .where('c.clientId = :clientId', { clientId })
      .andWhere('d.isDefault = true')
      .getRawOne<{
        clientId: string;
        deliveryAddressId: string;
      }>();

    if (!row) throw new Error('Client Not Found');

    return row;
  }
}
