import { DishDTO } from './dish.dto';

export class GetDishPageDTO {
  restaurantName: string;
  restaurantLogo?: string;
  dish: DishDTO;
  dishes: DishDTO[];
}
