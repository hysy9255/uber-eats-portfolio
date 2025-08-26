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

  @UseGuards(AuthGuard)
  @Patch('/:id/accept')
  async ownerAcceptOrder(@Req() req: Request, @Param('id') orderId: string) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.acceptOrder(orderId, requester.userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id/ready')
  async ownerMarkOrderReady(@Req() req: Request, @Param('id') orderId: string) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.markOrderReady(orderId, requester.userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id/delivery/accept')
  async driverAcceptOrder(@Req() req: Request, @Param('id') orderId: string) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.driverAcceptOrder(orderId, requester.userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id/delivery/decline')
  async driverDeclineOrder(@Req() req: Request, @Param('id') orderId: string) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.driverDeclineOrder(orderId, requester.userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id/delivery/pickup')
  async driverPickupOrder(@Req() req: Request, @Param('id') orderId: string) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.driverPickupOrder(orderId, requester.userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id/delivery/complete')
  async driverCompleteDelivery(
    @Req() req: Request,
    @Param('id') orderId: string,
  ) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.driverCompleteDelivery(orderId, requester.userId);
  }
}
