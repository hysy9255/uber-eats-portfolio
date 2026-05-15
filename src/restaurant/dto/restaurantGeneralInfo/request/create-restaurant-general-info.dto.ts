import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { OrderType } from 'src/constants/orderType';

export class CreateRestaurantGeneralInfoDTO {
  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'Restaurant logo image URL',
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    example: '123456789',
    description: 'Legal business name or business registration number',
  })
  @IsString()
  lbn: string;

  @ApiProperty({
    example: 'Shawn Seafood',
    description: 'Restaurant display name',
  })
  @IsString()
  dba: string;

  @ApiProperty({
    example: 'Seafood',
    description: 'Cuisine type',
  })
  @IsString()
  cuisineType: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: 'Restaurant store phone number',
  })
  @IsString()
  storePhone: string;

  @ApiProperty({
    example: 'restaurant@example.com',
    description: 'Restaurant business email',
  })
  @IsEmail()
  businessEmail: string;

  @ApiPropertyOptional({
    example: 'https://restaurant.example.com',
    description: 'Restaurant website URL',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com/restaurant',
    description: 'Restaurant Instagram URL',
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({
    example: 'https://example.com/main.png',
    description: 'Main restaurant image URL',
  })
  @IsString()
  mainImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/sub1.png',
    description: 'Sub image URL 1',
  })
  @IsString()
  sub1ImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/sub2.png',
    description: 'Sub image URL 2',
  })
  @IsString()
  sub2ImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/banner.png',
    description: 'Restaurant banner image URL',
  })
  @IsString()
  bannerImgUrl: string;

  @ApiProperty({
    example: 5,
    description: 'Delivery radius',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  deliveryRadius: number;

  @ApiProperty({
    example: 30,
    description: 'Estimated preparation time in minutes',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  prepTime: number;

  @ApiProperty({
    enum: OrderType,
    example: OrderType.DeliveryOnly,
    description: 'Supported order type',
  })
  @IsEnum(OrderType)
  orderType: OrderType;
}
