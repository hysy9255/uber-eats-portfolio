import { OrderStatus } from './orderStatus';

export const ONGOING_ORDER_STATUSES = [
  OrderStatus.Pending,
  OrderStatus.Cooking,
  OrderStatus.Ready,
  OrderStatus.Delivering,
];

export const FINISHED_ORDER_STATUSES = [OrderStatus.Delivered];
