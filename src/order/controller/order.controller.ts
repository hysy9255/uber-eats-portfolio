import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateOrderInput } from '../dto/order-input';
import { OrderService } from '../service/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Req() req: Request,
    @Body() createOrderInput: CreateOrderInput,
  ) {
    const clientId = req['userId'] as string;
    await this.orderService.createOrder(clientId, createOrderInput);
  }

  @Get()
  getOrders() {}

  @Get('/:id')
  async getOrder(@Req() req: Request, @Param('id') orderId: string) {
    const requesterId = req['userId'] as string;
    return await this.orderService.getOrder(orderId, requesterId);
  }

  @Patch('/:id/accept')
  async ownerAcceptOrder(@Param('id') orderId: string) {
    await this.orderService.acceptOrder(orderId);
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
