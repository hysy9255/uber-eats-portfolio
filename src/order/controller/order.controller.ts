import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderInput } from '../dto/order-input';
import { OrderService } from '../service/order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserOutput } from 'src/user/dto/user-output';

@Controller('restaurants/:restaurantId/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: string,
    @Body() createOrderInput: CreateOrderInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.orderService.createOrder(userId, restaurantId, createOrderInput);
  }

  @Get()
  getOrders() {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getOrder(@Req() req: Request, @Param('id') orderId: string) {
    const requester = req['authUser'] as UserOutput;
    return await this.orderService.getOrder(orderId, requester);
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
