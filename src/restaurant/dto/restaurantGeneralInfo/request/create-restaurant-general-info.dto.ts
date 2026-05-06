import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { OrderType } from 'src/constants/orderType';

export class CreateRestaurantGeneralInfoDTO {
  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'Restaurant logo image URL',
  })
  @IsOptional()
  @IsUrl()
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
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com/restaurant',
    description: 'Restaurant Instagram URL',
  })
  @IsOptional()
  @IsUrl()
  instagram?: string;

  @ApiProperty({
    example: 'https://example.com/main.png',
    description: 'Main restaurant image URL',
  })
  @IsUrl()
  mainImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/sub1.png',
    description: 'Sub image URL 1',
  })
  @IsUrl()
  sub1ImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/sub2.png',
    description: 'Sub image URL 2',
  })
  @IsUrl()
  sub2ImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/banner.png',
    description: 'Restaurant banner image URL',
  })
  @IsUrl()
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
