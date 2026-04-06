import { PartialType } from '@nestjs/mapped-types';
import { OrderStatus } from 'src/constants/orderStatus';

export class OrderItem {
  dishId: string;
  quantity: number;
}

export class OrderOutput {
  orderId: string;
  restaurantId: string;
  status: OrderStatus;
  deliveryAddress: string;
  note: string;
  items: OrderItem[];
}

export class OrderSummaryOutput extends PartialType(OrderOutput) {}

export class OrderItemDetail {
  dishImg: string;
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
}

export class OrderDetailForRestaurantDashboardDTO {
  orderId: string;
  orderItems: OrderItemDetail[];
  clientName: string;
  totalPrice: number;
  status: OrderStatus;
  requestToRestaurant: string;
}
