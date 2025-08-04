import { PartialType } from '@nestjs/mapped-types';

export class DishOutput {
  dishId: string;
  name: string;
  price: number;
}

export class DishSummaryOutput extends PartialType(DishOutput) {}
