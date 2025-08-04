import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderInput } from '../dto/order-input';

@Controller('orders')
export class OrderController {
  constructor() {}

  @Post()
  createOrder(@Body() createOrderInput: CreateOrderInput) {
    console.log(createOrderInput);
  }

  @Get()
  getOrders() {}

  @Get('/:id')
  getOrder(@Param('id') orderId: string) {
    console.log(orderId);
  }

  @Patch('/:id/accept')
  ownerAcceptOrder(@Param('id') orderId: string) {
    console.log(orderId);
  }

  @Patch('/:id/ready')
  ownerMarkOrderReady(@Param('id') orderId: string) {
    console.log(orderId);
  }

  @Patch('/:id/delivery/accept')
  driverAcceptOrder(@Param('id') orderId: string) {
    console.log(orderId);
  }

  @Patch('/:id/delivery/decline')
  driverDeclineOrder(@Param('id') orderId: string) {
    console.log(orderId);
  }

  @Patch('/:id/delivery/pickup')
  driverPickupOrder(@Param('id') orderId: string) {
    console.log(orderId);
  }

  @Patch('/:id/delivery/complete')
  driverCompleteDelivery(@Param('id') orderId: string) {
    console.log(orderId);
  }
}
