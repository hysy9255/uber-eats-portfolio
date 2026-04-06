import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantGeneralInfoDTO } from './create-restaurant-general-info.dto';

export class UpdateRestaurantGeneralInfoDTO extends PartialType(
  CreateRestaurantGeneralInfoDTO,
) {}
