import { ReadOrderData } from 'src/order/types/read-order-data';

export const calculateAvgOrder = (orders: ReadOrderData[], revenue: number) => {
  return orders.length === 0 ? 0 : revenue / orders.length;
};
