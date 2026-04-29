import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderStatus } from 'src/constants/orderStatus';
import { OrderRepository } from '../repository/order.repository';
import { ReadOrderData } from '../types/read-order-data';
import { OwnerRepository } from 'src/owner/owner.repository';
import { DishInternalService } from 'src/dish/dish.internal.service';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { ClientLoader } from 'src/client/service/client.loader';

@Injectable()
export class OrderValidationService {
  constructor(
    private readonly restaurantRepo: RestaurantRepository,
    private readonly owner: OwnerRepository,
    private readonly order: OrderRepository,
    private readonly clientLoader: ClientLoader,
    private readonly dishService: DishInternalService,
  ) {}

  async createOrder(clientId: string, dto: CreateOrderDTO) {
    const { restaurantId, orderItems, deliveryAddressId } = dto;
    const dishIds = orderItems.map((item) => item.dishId);

    const client = await this.clientLoader.loadClient(clientId);
    // const restaurant = await this.restaurant.loadRestaurant(restaurantId);
    console.log(restaurantId);

    // validate client ownership of delivery address
    client.ensureOwnsAddress(deliveryAddressId);

    // validate restaurant is open
    // restaurant.isOpen();

    // validate duplicate dishIds
    this.dishService.hasDuplicateIds(dishIds);

    // validate dish existence and restaurant ownership
    // restaurant.ensureDishExist(dishIds);
  }

  async updateOrder(orderId: string, ownerId: string, newStatus: OrderStatus) {
    // validate owner
    await this.owner.findOneById(ownerId);

    // validate restaurant existence and ownership
    const { restaurantId } = await this.restaurantRepo.findOneByOwner(ownerId);

    // validate order existence
    const order = await this.order.findOneById(orderId);

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

  getOrder(clientId: string, order: ReadOrderData) {
    if (order.clientId !== clientId) throw new Error('Unauthorized');
  }
}
