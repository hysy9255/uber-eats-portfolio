import { PartialType } from '@nestjs/mapped-types';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  Ready = 'Ready',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
}

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

export class OrderForRestaurantDashboardDTO {
  orderId: string;
  date: string;
  time: string;
  status: OrderStatus;
  requestToRestaurant: string | null;
  totalPrice: string;
  clientName: string;
  driverName: string | null;
}

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
