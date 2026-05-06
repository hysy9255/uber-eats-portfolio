import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderItemDTO {
  @IsUUID()
  dishId: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
