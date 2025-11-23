import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDishInput {
  @ApiProperty({ example: 'Lobster', description: 'dish name' })
  name: string;

  @ApiProperty({ example: 23, description: 'dish price' })
  price: number;

  @ApiProperty({
    example:
      'Wild Alaskan king crab legs, steamed to order and cracked for easy eating. Served with warm drawn butter and lemon',
    description: 'dish description',
  })
  description: string;

  @ApiProperty({ example: 'main dish', description: 'dish category' })
  category: string;

  @ApiProperty({ example: 'dish image url', description: 'dish image url' })
  dishImgUrl: string;
}

export class UpdateDishInput extends PartialType(CreateDishInput) {}

export class MenuInput {
  @ApiProperty({ example: 'pasta', description: 'dish name' })
  name: string;
  @ApiProperty({ example: '24', description: 'dish price' })
  price: string;
  @ApiProperty({ example: 'main', description: 'dish category' })
  category: string;
  @ApiProperty({ example: 'delicious pasta', description: 'dish description' })
  description: string;
  @ApiProperty({ example: '', description: 'dish image url' })
  dishImgUrl?: string;
}

export class CreateMenuInput {
  @ApiProperty({ type: [MenuInput], description: 'menu items' })
  items: MenuInput[];
}
