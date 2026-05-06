import { OrderStatus } from 'src/constants/orderStatus';

export type OwnerOrderDetailRow = {
  orderId: string;
  createdAt: Date;
  totalPrice: number;
  status: OrderStatus;
  requestToRestaurant: string | null;
  quantity: number;
  price: number;
  name: string;
  dishImg: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  clientName: string;
  clientId: string;
  phoneNumber: string;
};
