import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RejectedDeliveryOrderEntity } from '../orm-entities/rejected-delivery-order.orm.entity';

@Injectable()
export class RejectedDeliveryOrderRepository {
  constructor(
    @InjectRepository(RejectedDeliveryOrderEntity)
    private readonly rejectedDeliveryOrderRepository: Repository<RejectedDeliveryOrderEntity>,
  ) {}

  async save(rejectedOrder: { orderId: string; driverId: string }) {
    const entity = this.rejectedDeliveryOrderRepository.create(rejectedOrder);
    await this.rejectedDeliveryOrderRepository.save(entity);
  }
}
