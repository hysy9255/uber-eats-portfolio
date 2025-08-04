import { OrderItem } from './order-output';

export class CreateOrderInput {
  restaurantId: string;
  deliveryAddress: string;
  note: string;
  items: OrderItem[];
}
