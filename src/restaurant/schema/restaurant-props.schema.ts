import { z } from 'zod';

export const RestaurantPropsSchema = z.object({
  restaurantId: z.string(),
  ownerId: z.string(),
  logo: z.string().nullable(),
  lbn: z.string(),
  dba: z.string(),
  cuisineType: z.string(),
  storePhone: z.string(),
  businessEmail: z.string(),
  website: z.string().nullable(),
  instagram: z.string().nullable(),
  mainImgUrl: z.string(),
  sub1ImgUrl: z.string(),
  sub2ImgUrl: z.string(),
  bannerImgUrl: z.string().nullable(),
  deliveryRadius: z.coerce.number(),
  prepTime: z.string(),
  orderType: z.string(),
});

export type RestaurantProps = z.infer<typeof RestaurantPropsSchema>;
