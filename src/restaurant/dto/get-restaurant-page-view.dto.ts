import { RestaurantDTO } from './restaurantInfo/restaurant.dto';
import { OperatingHoursDTO } from './operatingHours/operating-hours.dto';
import { RestaurantAddressDTO } from './restaurantAddress/restaurant-address.dto';
import { DishDTO } from 'src/dish/dto/dish.dto';

export class GetRestaurantPageViewDTO {
  restaurantSummary: {
    generalInfo: RestaurantDTO;
    operatingHours: OperatingHoursDTO;
    address: RestaurantAddressDTO;
  };
  dishes: DishDTO[];
}
