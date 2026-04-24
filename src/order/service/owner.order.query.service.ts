import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/constants/orderStatus';
import { OwnerInternalService } from 'src/owner/owner.internal.service';
import { OrderRepository } from '../repository/order.repository';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { DeliveryAddressSnapshotRepository } from '../repository/delivery-address-snapshot.repository';
import { GetOrderForOwnerDTO } from '../dto/get-order-for-owner.dto';
import { ClientInternalService } from 'src/client/service/client.internal.service';
import { OrderOwnerDTOAssembler } from '../assembler/order-owner-dto.assembler';

@Injectable()
export class OwnerOrderQueryService {
  constructor(
    private readonly ownerService: OwnerInternalService,
    private readonly clientService: ClientInternalService,

    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly snapshotRepo: DeliveryAddressSnapshotRepository,

    private readonly ownerAssembler: OrderOwnerDTOAssembler,
  ) {}

  async orders(
    userId: string,
    status?: OrderStatus,
  ): Promise<GetOrderForOwnerDTO[]> {
    const { ownerId } = await this.ownerService.getIdByUser(userId);
    const orders = await this.orderRepo.findByOwner(ownerId, status);

    if (orders.length === 0) return [];

    const orderIds = orders.map((order) => order.orderId);
    const clientIds = orders.map((order) => order.clientId);

    const orderItems = await this.orderItemRepo.findByOrders(orderIds);
    const snapshots = await this.snapshotRepo.findByOrders(orderIds);
    const clientInfos = await this.clientService.getByIds(clientIds);

    return this.ownerAssembler.build(
      orders,
      orderItems,
      snapshots,
      clientInfos,
    );
  }
}
