import { z } from 'zod';

export const ReadRestaurantDataSchema = z.object({
  restaurantId: z.string(),
  ownerId: z.string(),
  logo: z.string().nullable(),
  lbn: z.string(),
  dba: z.string(),
  cuisineType: z.string(),
  storePhone: z.string(),
  businessEmail: z.string(),
  instagram: z.string().nullable(),
  website: z.string().nullable(),
  mainImgUrl: z.string(),
  sub1ImgUrl: z.string(),
  sub2ImgUrl: z.string(),
  bannerImgUrl: z.string(),
  deliveryRadius: z.coerce.number(),
  prepTime: z.string(),
  orderType: z.string(),
});
