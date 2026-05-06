import { OrderStatus } from 'src/constants/orderStatus';

export type OrderAggregateRow = {
  orderId: string;
  status: OrderStatus;
};
