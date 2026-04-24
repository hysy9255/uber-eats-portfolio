import { Injectable } from '@nestjs/common';
import { DeliveryAddressSnapshotRepository } from '../repository/delivery-address-snapshot.repository';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { OrderRepository } from '../repository/order.repository';
import { OrderValidationService } from './order.validation.service';
import { ClientInternalService } from 'src/client/service/client.internal.service';
import { OrderStatus } from 'src/constants/orderStatus';
import { GetOrderForClientDTO } from '../dto/get-order-for-client.dto';
import { RestaurantInternalService } from 'src/restaurant/service/restaurant.internal.service';
import { OrderClientDTOAssembler } from '../assembler/order-client-dto.assembler';

@Injectable()
export class ClientOrderQueryService {
  constructor(
    private readonly restaurantService: RestaurantInternalService,
    private readonly clientService: ClientInternalService,

    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly snapshotRepo: DeliveryAddressSnapshotRepository,

    private readonly clientAssembler: OrderClientDTOAssembler,

    private readonly validation: OrderValidationService,
  ) {}

  async orders(
    clientId: string,
    statuses?: OrderStatus[],
  ): Promise<GetOrderForClientDTO[]> {
    const orders = await this.orderRepo.findByClient(clientId, statuses);

    if (orders.length === 0) return [];

    const orderIds = orders.map((order) => order.orderId);

    const orderItems = await this.orderItemRepo.findByOrders(orderIds);
    const snapshots = await this.snapshotRepo.findByOrders(orderIds);
    const restaurants = await this.restaurantService.getByOrders(orderIds);

    return this.clientAssembler.buildMany(
      orders,
      orderItems,
      snapshots,
      restaurants,
    );
  }

  async order(
    clientId: string,
    orderId: string,
  ): Promise<GetOrderForClientDTO> {
    const order = await this.orderRepo.findById(orderId);
    const orderItems = await this.orderItemRepo.findByOrderId(orderId);
    const restaurant = await this.restaurantService.getByOrderId(orderId);

    this.validation.getOrder(clientId, order);
    return this.clientAssembler.build(order, orderItems, restaurant);
  }
}
