import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { ClientInternalService } from 'src/client/service/client.internal.service';
import { DishInternalService } from 'src/dish/dish.internal.service';
import { OrderDomainService } from './order.domain.service';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderRepository } from '../repository/order.repository';
import { OrderItemMapper } from '../mapper/order-item.mapper';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { DeliveryAddressSnapshotMapper } from '../mapper/delivery-address-snapshot.mapper';
import { DeliveryAddressSnapshotRepository } from '../repository/delivery-address-snapshot.repository';
import { OrderGateway } from '../order.gateway';
import { OrderValidationService } from './order.validation.service';
import { OrderStatus } from 'src/constants/orderStatus';

@Injectable()
export class OrderCommandService {
  constructor(
    private readonly clientService: ClientInternalService,
    private readonly dishService: DishInternalService,

    private readonly orderDomainService: OrderDomainService,

    private readonly validation: OrderValidationService,

    private readonly orderMapper: OrderMapper,
    private readonly orderItemMapper: OrderItemMapper,
    private readonly deliveryAddressSnapshotMapper: DeliveryAddressSnapshotMapper,

    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly deliveryAddressSnapshotRepo: DeliveryAddressSnapshotRepository,

    private readonly orderGateway: OrderGateway,
  ) {}

  async create(
    userId: string,
    dto: CreateOrderDTO,
  ): Promise<{ orderId: string }> {
    await this.validation.createOrder(userId, dto);

    const { orderItems, deliveryAddressId, restaurantId } = dto;

    const { orderId } = await this.orderRepo.saveOrder(
      this.orderMapper.dtoToCreateData(
        await this.clientService.getClientIdByUser(userId),
        this.orderDomainService.calculateTotalPrice(
          orderItems,
          await this.dishService.getByIds(
            orderItems.map((item) => item.dishId),
          ),
        ),
        dto,
      ),
    );

    await this.orderItemRepo.save(
      this.orderItemMapper.dtoToCreateData(orderId, orderItems),
    );

    await this.deliveryAddressSnapshotRepo.save(
      this.deliveryAddressSnapshotMapper.toCreateData(
        orderId,
        await this.clientService.getDeliveryAddressById(deliveryAddressId),
      ),
    );

    this.orderGateway.emitOrderCreated(restaurantId, {
      restaurantId,
    });

    return { orderId };
  }

  async update(orderId: string, userId: string, newStatus: OrderStatus) {
    await this.validation.updateOrder(orderId, userId, newStatus);

    const order = await this.orderRepo.findById(orderId);
    order.status = newStatus;

    await this.orderRepo.updateOrder(this.orderMapper.readToUpdateData(order));

    this.orderGateway.emitOrderStatusChanged(order.orderId, {
      orderId: order.orderId,
      status: order.status,
    });
  }
}
