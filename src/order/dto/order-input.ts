import { OrderItem } from './order-output';

export enum DeliveryType {
  free = 'free',
  direct = 'direct',
}

export class CreateOrderInput {
  restaurantId: string;
  orderItems: OrderItem[];
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  requestToRestaurant: string | null;
  requestToDriver: string | null;
}
