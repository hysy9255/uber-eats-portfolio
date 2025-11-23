import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../orm-entities/customer.orm.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async saveClient(
    userId: string,
    clientId: string,
    deliveryAddress: string,
    deliveryNotes: string,
  ) {
    await this.customerRepository.save(
      this.customerRepository.create({
        userId,
        clientId,
        deliveryAddress,
        deliveryNotes,
      }),
    );
  }

  // async getClientByUserId(userId: string) {
  //   return await this.customerRepository
  //     .createQueryBuilder('client')
  //     .where('client.userId = :userId', { userId })
  //     .getOne();
  // }

  // async getClientIdByUserId(userId: string) {
  //   const row = await this.customerRepository
  //     .createQueryBuilder('c')
  //     .select('c.clientId', 'clientId')
  //     .where('c.userId = :userId', { userId })
  //     .getRawOne<{ clientId: string }>();

  //   return row?.clientId ?? null;
  // }
}
