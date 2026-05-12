import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../../dto/request/create-order.dto';
import { OrderGateway } from '../../order.gateway';
import { DeliveryAddressSnapshotRepository } from '../../repository/delivery-address-snapshot.repository';
import { OrderItemRepository } from '../../repository/orderItem.repository';
import { OrderRepository } from '../../repository/order.repository';
import { DeliveryAddressSnapshotMapper } from '../../mapper/delivery-address-snapshot.mapper';
import { OrderItemMapper } from '../../mapper/order-item.mapper';
import { OrderValidationService } from '../internal/order.validation.service';
import { OrderMapper } from '../../mapper/order.mapper';
import { OrderPriceCalculator } from '../internal/order-price.calculator';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ClientOrderCommandService {
  constructor(
    private readonly orderMapper: OrderMapper,
    private readonly orderItemMapper: OrderItemMapper,
    private readonly snapshotMapper: DeliveryAddressSnapshotMapper,

    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly snapshotRepo: DeliveryAddressSnapshotRepository,

    private readonly orderValidationService: OrderValidationService,
    private readonly orderGateway: OrderGateway,
    private readonly priceCalculator: OrderPriceCalculator,
  ) {}

  @Transactional()
  async createOrder(
    clientId: string,
    dto: CreateOrderDTO,
  ): Promise<{ orderId: string }> {
    const { dishes, deliveryAddress } =
      await this.orderValidationService.validateForCreate(clientId, dto);

    const { orderItems, restaurantId } = dto;

    const totalPrice = this.priceCalculator.calculateTotalPrice(
      orderItems,
      dishes,
    );

    const { orderId } = await this.orderRepo.save(
      this.orderMapper.dtoToCreateData(clientId, totalPrice, dto),
    );

    await Promise.all([
      this.orderItemRepo.save(
        this.orderItemMapper.dtoToCreateData(orderId, orderItems),
      ),
      this.snapshotRepo.save(
        this.snapshotMapper.dtoToCreateData(orderId, deliveryAddress),
      ),
    ]);

    this.orderGateway.emitOrderCreated(restaurantId, {
      restaurantId,
    });

    return { orderId };
  }
}
