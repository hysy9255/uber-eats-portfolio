import { DishEntityV2 } from '../orm-entities/dish.orm.entity';

export class DishPageOutput {
  dish: DishEntityV2;
  dba: string;
  dishes: DishEntityV2[];
}
