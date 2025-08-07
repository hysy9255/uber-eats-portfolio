import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from '../orm-entities/order-item.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async saveOrderItems(
    orderItems: {
      orderItemId: string;
      dishId: string;
      quantity: number;
      orderId: string;
    }[],
  ) {
    const entities = this.orderItemRepository.create(orderItems);
    await this.orderItemRepository.save(entities);
  }
}
