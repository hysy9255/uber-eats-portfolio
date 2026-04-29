import { OrderStatus } from 'src/constants/orderStatus';
import { z } from 'zod';

const ORDER_STATUS_VALUES = Object.values(OrderStatus) as [string, ...string[]];

export const ReadOrderDataSchema = z.object({
  orderId: z.string(),
  createdAt: z.coerce.date(),
  totalPrice: z.coerce.number(),
  status: z
    .enum(ORDER_STATUS_VALUES)
    .transform((value) => value as OrderStatus),
  requestToRestaurant: z.string().nullable(),
  clientId: z.string(),
  restaurantId: z.string(),
});
