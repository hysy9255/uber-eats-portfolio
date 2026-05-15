import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateDishDTO {
  @ApiProperty({ example: 'Lobster', description: 'dish name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 23, description: 'dish price' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'Wild Alaskan king crab legs...',
    description: 'dish description',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'main dish', description: 'dish category' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'dish image url', description: 'dish image url' })
  @IsOptional()
  @IsString()
  dishImgUrl?: string;
}
