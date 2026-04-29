import { z } from 'zod';

export const ReadDishDataSchema = z.object({
  dishId: z.string(),
  restaurantId: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  category: z.string(),
  dishImgUrl: z.string().nullable(),
});
