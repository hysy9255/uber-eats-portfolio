import { OrderStatus } from 'src/constants/orderStatus';

export type ClientOrderDetailRow = {
  orderId: string;
  createdAt: Date;
  totalPrice: number;
  status: OrderStatus;
  requestToRestaurant: string | null;
  dba: string;
  eta: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  quantity: number;
  name: string;
  price: number;
  dishImg: string;
};
