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
import { UserOutput, UserRole } from 'src/user/dto/user-output';
import { Roles } from 'src/auth/roles.decorator';
import { ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';
import {
  OrderDetailForRestaurantDashboardDTO,
  OrderForRestaurantDashboardDTO,
} from '../dto/order-output';

@ApiSecurity('jwt-token')
@ApiParam({
  name: 'restaurantId',
  required: true,
  type: String,
})
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Make an order' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Post()
  async createOrder(
    @Req() req: Request,
    @Body() createOrderInput: CreateOrderInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.orderService.createOrder(userId, createOrderInput);
  }

  @ApiOperation({ summary: 'Get orders' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get()
  getOrdersView(
    @Req() req: Request,
  ): Promise<OrderForRestaurantDashboardDTO[]> {
    const { userId } = req['authUser'] as UserOutput;
    return this.orderService.getOrdersView(userId);
  }

  @ApiOperation({ summary: 'Get order detail' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get('/:orderId')
  getOrderDetailView(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ): Promise<OrderDetailForRestaurantDashboardDTO> {
    const { userId } = req['authUser'] as UserOutput;
    return this.orderService.getOrderDetailView(userId, orderId);
  }

  // @ApiOperation({ summary: 'Get an order' })
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  // @Get('/:orderId')
  // async getOrder(@Req() req: Request, @Param('orderId') orderId: string) {
  //   const requester = req['authUser'] as UserOutput;
  //   return await this.orderService.getOrder(orderId, requester);
  // }

  @ApiOperation({ summary: 'Restaurant accepts an order' })
  @UseGuards(AuthGuard)
  @Patch('/:orderId/accept')
  async ownerAcceptOrder(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.acceptOrder(orderId, requester.userId);
  }

  @ApiOperation({ summary: 'Restaurant marks an order ready' })
  @UseGuards(AuthGuard)
  @Patch('/:orderId/ready')
  async ownerMarkOrderReady(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.markOrderReady(orderId, requester.userId);
  }

  @ApiOperation({ summary: 'Driver accepts delivering an order' })
  @UseGuards(AuthGuard)
  @Patch('/:orderId/delivery/accept')
  async driverAcceptOrder(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.driverAcceptOrder(orderId, requester.userId);
  }

  @ApiOperation({ summary: 'Driver declines delivering an order' })
  @UseGuards(AuthGuard)
  @Patch('/:orderId/delivery/decline')
  async driverDeclineOrder(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.driverDeclineOrder(orderId, requester.userId);
  }

  @ApiOperation({ summary: 'Driver picks up an order' })
  @UseGuards(AuthGuard)
  @Patch('/:orderId/delivery/pickup')
  async driverPickupOrder(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.driverPickupOrder(orderId, requester.userId);
  }

  @ApiOperation({ summary: 'Driver completes deliverying an order' })
  @UseGuards(AuthGuard)
  @Patch('/:orderId/delivery/complete')
  async driverCompleteDelivery(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ) {
    const requester = req['authUser'] as UserOutput;
    await this.orderService.driverCompleteDelivery(orderId, requester.userId);
  }
}
