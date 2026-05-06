import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantAddressDTO } from './create-restaurant-address.dto';

export class UpdateRestaurantAddressDTO extends PartialType(
  CreateRestaurantAddressDTO,
) {}
