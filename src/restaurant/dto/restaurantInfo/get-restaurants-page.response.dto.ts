import { OperatingHoursDTO } from '../operatingHours/operating-hours.dto';
import { RestaurantAddressDTO } from '../restaurantAddress/restaurant-address.dto';
import { RestaurantDTO } from './restaurant.dto';

export class GetRestaurantsPageResponseDTO {
  restaurantSummaries: {
    generalInfo: RestaurantDTO;
    operatingHours: OperatingHoursDTO;
    address: RestaurantAddressDTO;
  }[];
}
