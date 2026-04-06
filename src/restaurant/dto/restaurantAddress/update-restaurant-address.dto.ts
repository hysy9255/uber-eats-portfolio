import { PartialType } from '@nestjs/mapped-types';
import { RestaurantAddressDTO } from '../restaurantAddress/restaurant-address.dto';

export class UpdateRestaurantAddressDTO extends PartialType(
  RestaurantAddressDTO,
) {}
