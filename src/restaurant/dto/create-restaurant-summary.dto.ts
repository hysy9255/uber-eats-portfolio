import { CreateOperatingHoursDTO } from './operatingHours/create-operating-hours.request.dto';
import { CreateRestaurantAddressDTO } from './restaurantAddress/create-restaurant-address.dto';
import { CreateRestaurantGeneralInfoDTO } from './restaurantInfo/create-restaurant-general-info.dto';

export class CreateRestaurantSummaryDTO {
  generalInfo: CreateRestaurantGeneralInfoDTO;
  address: CreateRestaurantAddressDTO;
  operatingHours: CreateOperatingHoursDTO;
}
