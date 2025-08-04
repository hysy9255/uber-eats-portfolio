import { PartialType } from '@nestjs/mapped-types';

export class CreateRestaurantInput {
  name: string;
  address: string;
}

export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {}
