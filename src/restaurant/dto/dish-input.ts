import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDishInput {
  @ApiProperty({ example: 'Lobster', description: 'dish name' })
  name: string;
  @ApiProperty({ example: 23, description: 'dish price' })
  price: number;
}

export class UpdateDishInput extends PartialType(CreateDishInput) {}
