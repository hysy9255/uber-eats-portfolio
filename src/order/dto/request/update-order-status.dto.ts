import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/constants/orderStatus';

export class UpdateOrderStatusDTO {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
