import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/constants/orderStatus';

export class OrderDTO {
  @ApiProperty({ example: 'xxx', description: 'order uuid' })
  orderId: string;

  @ApiProperty({ example: 'xxx', description: 'order date' })
  createdAt: string;

  @ApiProperty({ example: '30.33', description: 'order total price' })
  totalPrice: number;

  @ApiProperty({ example: 'Pending', description: 'order status' })
  status: OrderStatus;

  @ApiProperty({
    example: 'xxx',
    description: 'Request to restaurant',
    nullable: true,
  })
  requestToRestaurant: string | null;

  constructor(init: {
    orderId: string;
    createdAt: string;
    totalPrice: number;
    status: OrderStatus;
    requestToRestaurant: string | null;
  }) {
    this.orderId = init.orderId;
    this.createdAt = init.createdAt;
    this.totalPrice = init.totalPrice;
    this.status = init.status;
    this.requestToRestaurant = init.requestToRestaurant;
  }
}
