import { DeliveryType } from 'src/constants/deliveryType';

export class OrderItem {
  dishId: string;
  quantity: number;
}

export class CreateOrderDTO {
  restaurantId: string;
  orderItems: OrderItem[];
  deliveryType: DeliveryType;
  deliveryAddressId: string;
  requestToRestaurant?: string;
  requestToDriver?: string;
}
