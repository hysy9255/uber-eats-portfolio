import { DishDTO } from './dish.dto';

export class GetDishPageDTO {
  restaurantName: string;
  restaurantLogo: string | null;
  dish: DishDTO;
  dishes: DishDTO[];
}
