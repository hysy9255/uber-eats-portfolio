import { Injectable } from '@nestjs/common';
import { OrderGateway } from '../order.gateway';
import { OrderRepository } from '../repository/order.repository';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderValidationService } from './order.validation.service';
import { OrderStatus } from 'src/constants/orderStatus';

@Injectable()
export class OwnerOrderCommandService {
  constructor(
    private readonly validation: OrderValidationService,

    private readonly orderMapper: OrderMapper,

    private readonly orderRepo: OrderRepository,

    private readonly orderGateway: OrderGateway,
  ) {}

  async update(orderId: string, userId: string, newStatus: OrderStatus) {
    await this.validation.updateOrder(orderId, userId, newStatus);

    const order = await this.orderRepo.findOrderById(orderId);
    order.status = newStatus;

    await this.orderRepo.updateOrder(this.orderMapper.readToUpdateData(order));

    this.orderGateway.emitOrderStatusChanged(order.orderId, {
      orderId: order.orderId,
      status: order.status,
    });
  }
}
