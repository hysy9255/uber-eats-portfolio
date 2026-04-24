import { DeliveryType } from 'src/constants/deliveryType';
import { OrderItem } from '../dto/create-order.dto';

export class CreateOrderData {
  orderId: string;
  clientId: string;
  totalPrice: number;
  restaurantId: string;
  orderItems: OrderItem[];
  deliveryType: DeliveryType;
  requestToRestaurant?: string;
  requestToDriver?: string;

  constructor(init: {
    orderId: string;
    clientId: string;
    totalPrice: number;
    restaurantId: string;
    orderItems: OrderItem[];
    deliveryType: DeliveryType;
    requestToRestaurant?: string;
    requestToDriver?: string;
  }) {
    this.orderId = init.orderId;
    this.clientId = init.clientId;
    this.totalPrice = init.totalPrice;
    this.restaurantId = init.restaurantId;
    this.orderItems = init.orderItems;
    this.deliveryType = init.deliveryType;
    this.requestToRestaurant = init.requestToRestaurant;
    this.requestToDriver = init.requestToDriver;
  }
}
