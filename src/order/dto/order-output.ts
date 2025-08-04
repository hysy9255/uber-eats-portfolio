import { PartialType } from '@nestjs/mapped-types';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  Ready = 'Ready',
  PickedUp = 'PickedUp',
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
