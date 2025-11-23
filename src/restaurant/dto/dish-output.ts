import { PartialType } from '@nestjs/mapped-types';

export class DishOutput {
  dishId: string;
  name: string;
  price: number;
  descriptions: string;
  category: string;
}

export class DishSummaryOutput extends PartialType(DishOutput) {}
