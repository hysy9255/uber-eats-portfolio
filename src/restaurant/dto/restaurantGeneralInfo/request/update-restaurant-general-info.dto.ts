import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantGeneralInfoDTO } from './create-restaurant-general-info.dto';

export class UpdateRestaurantGeneralInfoDTO extends PartialType(
  CreateRestaurantGeneralInfoDTO,
) {}
