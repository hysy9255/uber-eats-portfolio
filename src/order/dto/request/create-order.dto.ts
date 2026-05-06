import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { DeliveryType } from 'src/constants/deliveryType';
import { CreateOrderItemDTO } from './create-order-item.dto';

export class CreateOrderDTO {
  @IsUUID()
  restaurantId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  orderItems: CreateOrderItemDTO[];

  @IsEnum(DeliveryType)
  deliveryType: DeliveryType;

  @IsUUID()
  deliveryAddressId: string;

  @IsOptional()
  @IsString()
  requestToRestaurant?: string;

  @IsOptional()
  @IsString()
  requestToDriver?: string;
}
