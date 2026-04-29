import { Injectable } from '@nestjs/common';
import { Client } from '../Client';
import { ClientAggregateRepository } from '../repository/client.aggregate.repository';

@Injectable()
export class ClientLoader {
  constructor(
    private readonly clientAggregateRepo: ClientAggregateRepository,
  ) {}

  async loadClient(clientId: string) {
    const data = await this.clientAggregateRepo.findClientAggregate(clientId);
    return new Client(data.clientId, data.deliveryAddressId);
  }
}
