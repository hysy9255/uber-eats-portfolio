import { OrderStatus } from 'src/constants/orderStatus';

export type ReadOrderData = {
  orderId: string;
  createdAt: Date;
  totalPrice: number;
  status: OrderStatus;
  clientId: string;
  requestToRestaurant: string | null;
  restaurantId: string;
};
