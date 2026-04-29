import { OperatingHoursDTO } from './operatingHours/operating-hours.dto';
import { RestaurantAddressDTO } from './restaurantAddress/restaurant-address.dto';
import { RestaurantDTO } from './restaurantInfo/restaurant.dto';

export class BusinessInfoDTO {
  restaurantSummary: {
    generalInfo: RestaurantDTO;
    operatingHours: OperatingHoursDTO;
    address: RestaurantAddressDTO;
  };
}
