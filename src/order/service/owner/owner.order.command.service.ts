import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderGateway } from '../../order.gateway';
import { OrderRepository } from '../../repository/order.repository';
import { OrderMapper } from '../../mapper/order.mapper';
import { OrderStatus } from 'src/constants/orderStatus';
import { OrderValidationService } from '../internal/order.validation.service';

@Injectable()
export class OwnerOrderCommandService {
  constructor(
    private readonly orderMapper: OrderMapper,
    private readonly orderRepo: OrderRepository,
    private readonly orderGateway: OrderGateway,
    private readonly orderValidationService: OrderValidationService,
  ) {}

  async updateOrderStatus(
    orderId: string,
    ownerId: string,
    newStatus: OrderStatus,
  ) {
    const order = await this.orderRepo.findOneByIdAndOwnerId(orderId, ownerId);
    if (!order) throw new NotFoundException('Order is not found');

    this.orderValidationService.validateForUpdate(order, newStatus);
    order.status = newStatus;

    await this.orderRepo.update(this.orderMapper.readToUpdateData(order));

    this.orderGateway.emitOrderStatusChanged(order.orderId, {
      orderId: order.orderId,
      status: order.status,
    });
  }

  // async markAccepted() {}

  // async markRejected() {}

  // async markReady() {}

  // async markDeliverying() {}

  // async markDelivered() {}
}
