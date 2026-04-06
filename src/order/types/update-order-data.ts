import { OrderStatus } from 'src/constants/orderStatus';

export class UpdateOrderData {
  orderId: string;
  createdAt: Date;
  totalPrice: number;
  status: OrderStatus;
  clientId: string;
  requestToRestaurant?: string;

  constructor(init: {
    orderId: string;
    createdAt: Date;
    totalPrice: number;
    status: OrderStatus;
    clientId: string;
    requestToRestaurant?: string;
  }) {
    this.orderId = init.orderId;
    this.createdAt = init.createdAt;
    this.totalPrice = init.totalPrice;
    this.status = init.status;
    this.clientId = init.clientId;
    this.requestToRestaurant = init.requestToRestaurant;
  }
}
