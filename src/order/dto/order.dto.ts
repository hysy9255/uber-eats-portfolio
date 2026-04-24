import { OrderStatus } from 'src/constants/orderStatus';

export class OrderDTO {
  orderId: string;
  createdAt: string;
  totalPrice: number;
  status: OrderStatus;
  requestToRestaurant: string | null;

  constructor(init: {
    orderId: string;
    createdAt: string;
    totalPrice: number;
    status: OrderStatus;
    requestToRestaurant: string | null;
  }) {
    this.orderId = init.orderId;
    this.createdAt = init.createdAt;
    this.totalPrice = init.totalPrice;
    this.status = init.status;
    this.requestToRestaurant = init.requestToRestaurant;
  }
}
