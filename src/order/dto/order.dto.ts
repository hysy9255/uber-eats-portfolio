import { OrderStatus } from 'src/constants/orderStatus';

export class OrderDTO {
  orderId: string;
  createdAt: string;
  totalPrice: number;
  status: OrderStatus;
  requestToRestaurant?: string;

  constructor(init: {
    orderId: string;
    createdAt: string;
    totalPrice: number;
    status: OrderStatus;
    requestToRestaurant?: string;
  }) {
    this.orderId = init.orderId;
    this.createdAt = init.createdAt;
    this.totalPrice = init.totalPrice;
    this.status = init.status;
    this.requestToRestaurant = init.requestToRestaurant;
  }
}
