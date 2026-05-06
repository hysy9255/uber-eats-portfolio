import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../../dto/request/create-order.dto';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { DeliveryAddressRepository } from 'src/client/repository/delivery-address.repository';
import { OrderStatus } from 'src/constants/orderStatus';
import { ReadOrderData } from 'src/order/types/read-order-data';
import { DishRepository } from 'src/dish/repository/dish.repository';

@Injectable()
export class OrderValidationService {
  constructor(
    private readonly restaurantRepo: RestaurantRepository,
    private readonly dishRepo: DishRepository,
    private readonly addressRepo: DeliveryAddressRepository,
  ) {}

  async validateForCreate(clientId: string, dto: CreateOrderDTO) {
    // 레스오랑이 존재하는지
    // 주문하려는 음식들이 존재하는지
    // 주문하려는 음식들이 레스토랑에 속하는지
    // 배달 주소가 존재하는지, 클라이언트의 주소인지
    // 레스토랑이 영업중인지

    const { deliveryAddressId, restaurantId, orderItems } = dto;
    // check if restaurant exists
    const restaurant = await this.restaurantRepo.findOneById(restaurantId);
    if (!restaurant) throw new Error('Restaurant Not Found');

    // check if all dishes exist
    const dishes = await this.dishRepo.findByIds(
      orderItems.map((item) => item.dishId),
    );
    if (dishes.length !== dto.orderItems.length)
      throw new Error('Dish Not Found');
    // check if all dishes belong to the restaurant
    const restaurantIds = dishes.map((dish) => dish.restaurantId);
    const allDishBelongsToRestaurant = restaurantIds.every(
      (id) => id === restaurantId,
    );
    if (!allDishBelongsToRestaurant)
      throw new Error('One or more dishes do not belong to restaurant');

    // check if delivery address exists and  belongs to client
    const deliveryAddress = await this.addressRepo.findOneByIdAndClientId(
      deliveryAddressId,
      clientId,
    );
    if (!deliveryAddress) throw new Error('Address Not Found');

    // validate restaurant is open
    // restaurant.isOpen();

    return { deliveryAddress, dishes };
  }

  validateForUpdate(order: ReadOrderData, newStatus: OrderStatus) {
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
}
