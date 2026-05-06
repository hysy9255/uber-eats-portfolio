import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemDTO {
  @ApiPropertyOptional({
    example: 'https://example.com/dish.png',
    description: 'Dish image URL',
  })
  dishImg?: string;

  @ApiProperty({
    example: 'Lobster Pasta',
    description: 'Dish name',
  })
  name: string;

  @ApiProperty({
    example: 2,
    description: 'Order item quantity',
  })
  quantity: number;

  @ApiProperty({
    example: 23000,
    description: 'Dish price at order time',
  })
  price: number;

  constructor(init: {
    dishImg?: string;
    name: string;
    quantity: number;
    price: number;
  }) {
    this.dishImg = init.dishImg;
    this.name = init.name;
    this.quantity = init.quantity;
    this.price = init.price;
  }
}
