import { OperatingHoursDTO } from './operatingHours/operating-hours.dto';
import { RestaurantAddressDTO } from './restaurantAddress/restaurant-address.dto';
import { RestaurantDTO } from './restaurantInfo/restaurant.dto';

export class GetRestaurantsPageViewDTO {
  restaurantSummaries: {
    generalInfo: RestaurantDTO;
    address: RestaurantAddressDTO;
    operatingHours: OperatingHoursDTO;
  }[];
}
