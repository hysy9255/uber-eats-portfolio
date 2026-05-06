import { DishDTO } from './dish.dto';

export class DishPageDTO {
  restaurantName: string;
  restaurantLogo: string | null;
  dish: DishDTO;
  dishes: DishDTO[];
}
