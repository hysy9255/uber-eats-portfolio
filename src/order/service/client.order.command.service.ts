import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderGateway } from '../order.gateway';
import { DeliveryAddressSnapshotRepository } from '../repository/delivery-address-snapshot.repository';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { OrderRepository } from '../repository/order.repository';
import { DeliveryAddressSnapshotMapper } from '../mapper/delivery-address-snapshot.mapper';
import { OrderItemMapper } from '../mapper/order-item.mapper';
import { OrderValidationService } from './order.validation.service';
import { DeliveryAddressRepository } from 'src/client/repository/delivery-address.repository';

@Injectable()
export class ClientOrderCommandService {
  constructor(
    private readonly orderItemMapper: OrderItemMapper,
    private readonly snapshotMapper: DeliveryAddressSnapshotMapper,

    private readonly validation: OrderValidationService,
    private readonly orderGateway: OrderGateway,
    private readonly assembler: OrderClientDTOAssembler,

    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly snapshotRepo: DeliveryAddressSnapshotRepository,
    private readonly addressRepo: DeliveryAddressRepository,
  ) {}

  async create(
    clientId: string,
    dto: CreateOrderDTO,
  ): Promise<{ orderId: string }> {
    await this.validation.createOrder(clientId, dto);

    const { orderItems, deliveryAddressId, restaurantId } = dto;

    const { orderId } = await this.orderRepo.save(
      await this.assembler.buildCreateData(clientId, dto),
    );

    await this.orderItemRepo.save(
      this.orderItemMapper.dtoToCreateData(orderId, orderItems),
    );

    await this.snapshotRepo.save(
      this.snapshotMapper.toCreateData(
        orderId,
        await this.addressRepo.findOneById(deliveryAddressId),
      ),
    );

    this.orderGateway.emitOrderCreated(restaurantId, {
      restaurantId,
    });

    return { orderId };
  }
}
