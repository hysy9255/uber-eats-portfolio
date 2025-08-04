import { PartialType } from '@nestjs/mapped-types';

export class CreateDishInput {
  name: string;
  price: number;
}

export class UpdateDishInput extends PartialType(CreateDishInput) {}
