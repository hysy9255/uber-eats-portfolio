import { Injectable } from '@nestjs/common';
import { ReadOrderData } from '../types/read-order-data';
import { ReadOrderItemData } from '../types/read-order-item-data';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderItemMapper } from '../mapper/order-item.mapper';
import { DeliveryAddressSnapshotMapper } from '../mapper/delivery-address-snapshot.mapper';
import { GetOrderForClientDTO } from '../dto/get-order-for-client.dto';
import { ReadRestaurantData } from 'src/restaurant/types/read-restaurant-data';
import { RestaurantInfoDTO } from 'src/restaurant/dto/restaurant-Info.dto';
import { ReadDeliveryAddressSnapshotData } from '../types/read-delivery-address-snapshot-data';

@Injectable()
export class OrderClientDTOAssembler {
  constructor(
    private readonly orderMapper: OrderMapper,
    private readonly orderItemMapper: OrderItemMapper,
    private readonly deliveryAddressSnapshotMapper: DeliveryAddressSnapshotMapper,
  ) {}

  build(
    order: ReadOrderData,
    orderItems: ReadOrderItemData[],
    restaurant: ReadRestaurantData,
  ): GetOrderForClientDTO {
    const response = new GetOrderForClientDTO();

    response.orderInfo = this.orderMapper.readDataToDto(order);
    response.orderItems = this.orderItemMapper.readDataToDto(orderItems);

    const { dba, prepTime: eta } = restaurant;
    const restaurantInfo = new RestaurantInfoDTO({ dba, eta });
    response.restaurantInfo = restaurantInfo;

    return response;
  }

  buildMany(
    orders: ReadOrderData[],
    orderItems: ReadOrderItemData[],
    snapshots: ReadDeliveryAddressSnapshotData[],
    restaurants: ReadRestaurantData[],
  ) {
    const orderItemsMap = new Map<string, typeof orderItems>();
    for (const item of orderItems) {
      const existing = orderItemsMap.get(item.orderId) ?? [];
      existing.push(item);
      orderItemsMap.set(item.orderId, existing);
    }

    const snapshotMap = new Map(
      snapshots.map((snapshot) => [snapshot.orderId, snapshot]),
    );

    const restaurantMap = new Map(
      restaurants.map((restaurant) => [restaurant.restaurantId, restaurant]),
    );

    return orders.map((order) => {
      const response = new GetOrderForClientDTO();
      response.orderInfo = this.orderMapper.readDataToDto(order);

      const ois = orderItemsMap.get(order.orderId) ?? [];
      response.orderItems = this.orderItemMapper.readDataToDto(ois);

      const dass = snapshotMap.get(order.orderId);
      if (!dass) throw new Error('Delivery Address Snapshot Not Found');
      response.deliveryAddressInfo =
        this.deliveryAddressSnapshotMapper.readDataToDTO(dass);

      const restaurant = restaurantMap.get(order.restaurantId);
      if (!restaurant) throw new Error('Restaurant Not Found');
      const { dba, prepTime: eta } = restaurant;
      const restaurantInfo = new RestaurantInfoDTO({ dba, eta });
      response.restaurantInfo = restaurantInfo;

      return response;
    });
  }
}
