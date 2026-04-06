import { ApiProperty } from '@nestjs/swagger';

export class CreateDishDTO {
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
  dishImgUrl?: string;
}
