import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderType } from 'src/constants/orderType';

export class RestaurantGeneralInfoDTO {
  @ApiProperty({
    example: 'xxxx',
    description: 'Restaurant uuid',
  })
  readonly restaurantId: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'Restaurant logo image URL',
  })
  readonly logo: string | null;

  @ApiProperty({
    example: '123456789',
    description: 'Legal business name or business registration number',
  })
  readonly lbn: string;

  @ApiProperty({
    example: 'Shawn Seafood',
    description: 'Restaurant display name',
  })
  readonly dba: string;

  @ApiProperty({
    example: 'Seafood',
    description: 'Cuisine type',
  })
  readonly cuisineType: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: 'Restaurant store phone number',
  })
  readonly storePhone: string;

  @ApiProperty({
    example: 'restaurant@example.com',
    description: 'Restaurant business email',
  })
  readonly businessEmail: string;

  @ApiPropertyOptional({
    example: 'https://restaurant.example.com',
    description: 'Restaurant website URL',
  })
  readonly website: string | null;

  @ApiPropertyOptional({
    example: 'https://instagram.com/restaurant',
    description: 'Restaurant Instagram URL',
  })
  readonly instagram: string | null;

  @ApiProperty({
    example: 'https://example.com/main.png',
    description: 'Main restaurant image URL',
  })
  readonly mainImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/sub1.png',
    description: 'Sub image URL 1',
  })
  readonly sub1ImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/sub2.png',
    description: 'Sub image URL 2',
  })
  readonly sub2ImgUrl: string;

  @ApiProperty({
    example: 'https://example.com/banner.png',
    description: 'Restaurant banner image URL',
  })
  readonly bannerImgUrl: string;

  @ApiProperty({
    example: 5,
    description: 'Delivery radius',
  })
  readonly deliveryRadius: number;

  @ApiProperty({
    example: 30,
    description: 'Estimated preparation time in minutes',
  })
  readonly prepTime: number;

  @ApiProperty({
    enum: OrderType,
    example: OrderType.DeliveryOnly,
    description: 'Supported order type',
  })
  readonly orderType: OrderType;

  constructor(init: {
    restaurantId: string;
    logo: string | null;
    lbn: string;
    dba: string;
    cuisineType: string;
    storePhone: string;
    businessEmail: string;
    website: string | null;
    instagram: string | null;
    mainImgUrl: string;
    sub1ImgUrl: string;
    sub2ImgUrl: string;
    bannerImgUrl: string;
    deliveryRadius: number;
    prepTime: number;
    orderType: OrderType;
  }) {
    this.restaurantId = init.restaurantId;
    this.logo = init.logo;
    this.lbn = init.lbn;
    this.dba = init.dba;
    this.cuisineType = init.cuisineType;
    this.storePhone = init.storePhone;
    this.businessEmail = init.businessEmail;
    this.website = init.website;
    this.instagram = init.instagram;
    this.mainImgUrl = init.mainImgUrl;
    this.sub1ImgUrl = init.sub1ImgUrl;
    this.sub2ImgUrl = init.sub2ImgUrl;
    this.bannerImgUrl = init.bannerImgUrl;
    this.deliveryRadius = init.deliveryRadius;
    this.prepTime = init.prepTime;
    this.orderType = init.orderType;
  }
}
