import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from '../orm-entity/order-item.orm.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemData } from '../types/create-order-item-data';

@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly repo: Repository<OrderItemEntity>,
  ) {}

  async save(data: CreateOrderItemData[]) {
    try {
      await this.repo.save(this.repo.create(data));
    } catch (e) {
      console.error('Error saving order items:', e);
      throw new InternalServerErrorException('Failed to save order items');
    }
  }
}
