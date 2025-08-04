import { PartialType } from '@nestjs/mapped-types';

export class RestaurantOutput {
  restaurantId: string;
  name: string;
  address: string;
  dishes: any;
}

export class RestaurantSummaryOutput extends PartialType(RestaurantOutput) {}
