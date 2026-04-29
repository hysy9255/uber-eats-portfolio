import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/constants/orderStatus';
import { OrderRepository } from '../repository/order.repository';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { DeliveryAddressSnapshotRepository } from '../repository/delivery-address-snapshot.repository';
import { GetOrderForOwnerDTO } from '../dto/get-order-for-owner.dto';
import { OrderOwnerDTOAssembler } from '../assembler/order-owner-dto.assembler';
import { ClientRepository } from 'src/client/repository/client.repository';

@Injectable()
export class OwnerOrderQueryService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly snapshotRepo: DeliveryAddressSnapshotRepository,
    private readonly clientRepo: ClientRepository,

    private readonly assembler: OrderOwnerDTOAssembler,
  ) {}

  async orders(
    ownerId: string,
    status?: OrderStatus,
  ): Promise<GetOrderForOwnerDTO[]> {
    const orders = await this.orderRepo.findByOwner(ownerId, status);

    if (orders.length === 0) return [];

    const orderIds = orders.map((order) => order.orderId);
    const clientIds = orders.map((order) => order.clientId);

    const orderItems = await this.orderItemRepo.findByOrders(orderIds);
    const snapshots = await this.snapshotRepo.findByOrders(orderIds);
    const clientInfos = await this.clientRepo.findClientInfoByIds(clientIds);

    return this.assembler.build(orders, orderItems, snapshots, clientInfos);
  }
}
