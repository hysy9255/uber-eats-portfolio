import { ReadOrderData } from 'src/order/types/read-order-data';

export const calculateRevenue = (orders: ReadOrderData[]) => {
  return orders.reduce((sum, order) => sum + Number(order.totalPrice), 0);
};
