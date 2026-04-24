import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { RestaurantInternalService } from 'src/restaurant/service/restaurant.internal.service';
import { DishInternalService } from 'src/dish/dish.internal.service';
import { ClientInternalService } from 'src/client/service/client.internal.service';
import { OrderStatus } from 'src/constants/orderStatus';
import { OrderRepository } from '../repository/order.repository';
import { OwnerInternalService } from 'src/owner/owner.internal.service';
import { ReadOrderData } from '../types/read-order-data';

@Injectable()
export class OrderValidationService {
  constructor(
    private readonly restaurantService: RestaurantInternalService,
    private readonly dishService: DishInternalService,
    private readonly clientService: ClientInternalService,
    private readonly ownerService: OwnerInternalService,

    private readonly orderRepo: OrderRepository,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDTO) {
    const { restaurantId, orderItems, deliveryAddressId } = dto;

    // validate client existence
    const clientId = await this.clientService.getClientIdByUserId(userId);

    // validate client ownership of delivery address
    const deliveryAddress =
      await this.clientService.getDeliveryAddressById(deliveryAddressId);

    if (deliveryAddress.clientId !== clientId) {
      throw new Error('Invalid delivery address');
    }

    // validate restaurant existence
    await this.restaurantService.getById(restaurantId);

    // validate restaurant is open
    this.restaurantService.isRestaurantOpen(restaurantId);

    // validate duplicate dishIds
    const dishIdSet = new Set<string>();
    for (const item of orderItems) {
      if (dishIdSet.has(item.dishId)) {
        throw new Error('Duplicate dishId in order items');
      }
      dishIdSet.add(item.dishId);
    }

    // validate dish existence and restaurant ownership
    const dishes = await this.dishService.getManyByIds(
      orderItems.map((item) => item.dishId),
    );

    if (dishes.length !== orderItems.length) {
      throw new Error('dish does not exist');
    }

    for (const dish of dishes) {
      if (dish.restaurantId !== restaurantId) {
        throw new Error('dish does not belong to the restaurant');
      }
    }
  }

  async updateOrder(orderId: string, userId: string, newStatus: OrderStatus) {
    // validate owner & restaurant existence
    const { ownerId } = await this.ownerService.getOwnerIdByUserId(userId);
    const { restaurantId } =
      await this.ownerService.getRestaurantIdByOwnerId(ownerId);

    // validate order existence
    const order = await this.orderRepo.findById(orderId);

    // validate restaurant ownership of order
    if (order.restaurantId !== restaurantId) {
      throw new Error('Invalid order');
    }

    // validate order status
    const nextOrderStatusMap = {
      [OrderStatus.Pending]: OrderStatus.Cooking,
      [OrderStatus.Cooking]: OrderStatus.Ready,
      [OrderStatus.Ready]: OrderStatus.Delivering,
      [OrderStatus.Delivering]: OrderStatus.Delivered,
    };

    if (nextOrderStatusMap[order.status] !== newStatus) {
      throw new Error('Invalid order status transition');
    }
  }

  async getOrder(userId: string, order: ReadOrderData) {
    const { clientId } = await this.clientService.getClientByUserId(userId);
    if (order.clientId !== clientId) throw new Error('Unauthorized');
  }
}
