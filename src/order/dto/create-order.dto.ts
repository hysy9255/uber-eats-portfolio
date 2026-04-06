import { DeliveryType } from 'src/constants/deliveryType';
import { OrderItem } from './order-output';

export class CreateOrderDTO {
  restaurantId: string;
  orderItems: OrderItem[];
  deliveryType: DeliveryType;
  deliveryAddressId: string;
  requestToRestaurant?: string;
  requestToDriver?: string;
}
