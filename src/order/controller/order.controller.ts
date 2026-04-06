import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserOutput } from 'src/user/dto/user-output';
import { Roles } from 'src/auth/roles.decorator';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { UserRole } from 'src/constants/userRole';
import { OrderExternalService } from '../service/order.external.service';
import { GetOrderForOwnerDTO } from '../dto/get-order-for-owner.dto';
import { GetOrderForClientDTO } from '../dto/get-order-for-client.dto';
import { UpdateOrderStatusDTO } from '../dto/update-order-status.dto';
import { OrderStatus } from 'src/constants/orderStatus';
import { GetOwnerDashBoardPageDTO } from '../dto/get-owner-dashboard-page.dto';
import { MenuRankingDTO } from 'src/dish/types/menu-ranking-data';

@ApiSecurity('jwt-token')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderExternalService: OrderExternalService) {}

  @ApiOperation({ summary: 'Make an order' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Post()
  async createOrder(
    @Req() req: Request,
    @Body() dto: CreateOrderDTO,
  ): Promise<{ orderId: string }> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.orderExternalService.createOrder(userId, dto);
  }

  @ApiOperation({ summary: 'Get on going orders for client' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('/ongoing')
  async getOnGoingOrdersForClient(
    @Req() req: Request,
  ): Promise<GetOrderForClientDTO[]> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.orderExternalService.getOnGoingOrdersForClient(userId);
  }

  @ApiOperation({ summary: 'Make an order' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('/ranking')
  async menuRankings(
    @Req() req: Request,
    @Query('limit') limit: string,
  ): Promise<MenuRankingDTO> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.orderExternalService.getMenuRankings(userId, limit);
  }

  @ApiOperation({ summary: 'Get owner dashboard page' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get('/summary')
  async orderSummary(
    @Req() req: Request,
    @Query('range') range: string,
  ): Promise<GetOwnerDashBoardPageDTO> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.orderExternalService.getOwnerDashBoardPage(userId, range);
  }

  @ApiOperation({ summary: 'Get on going orders for client' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('/history')
  async getOrderHistoryForClient(
    @Req() req: Request,
  ): Promise<GetOrderForClientDTO[]> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.orderExternalService.getOrderHistoryForClient(userId);
  }

  @ApiOperation({ summary: 'Get order for client' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('/:orderId')
  async getOrderForClient(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ): Promise<GetOrderForClientDTO> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.orderExternalService.getOrderForClient(userId, orderId);
  }

  @ApiOperation({ summary: 'Get orders' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get()
  getOrdersForOwner(
    @Req() req: Request,
    @Query('status') status?: OrderStatus,
  ): Promise<GetOrderForOwnerDTO[]> {
    const { userId } = req['authUser'] as UserOutput;
    return this.orderExternalService.getOrdersForOwner(userId, status);
  }

  @ApiOperation({ summary: 'Owner updates order status' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Patch('/:orderId/status')
  async updateOrderStatus(
    @Req() req: Request,
    @Param('orderId') orderId: string,
    @Body() { status }: UpdateOrderStatusDTO,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.orderExternalService.updateOrderStatus(orderId, userId, status);
  }

  // @ApiOperation({ summary: 'Get order detail' })
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.Owner)
  // @Get('/:orderId')
  // getOrderDetailView(
  //   @Req() req: Request,
  //   @Param('orderId') orderId: string,
  // ): Promise<OrderDetailForRestaurantDashboardDTO> {
  //   const { userId } = req['authUser'] as UserOutput;
  //   return this.orderService.getOrderDetailView(userId, orderId);
  // }

  // @ApiOperation({ summary: 'Get an order' })
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  // @Get('/:orderId')
  // async getOrder(@Req() req: Request, @Param('orderId') orderId: string) {
  //   const requester = req['authUser'] as UserOutput;
  //   return await this.orderService.getOrder(orderId, requester);
  // }

  // @ApiOperation({ summary: 'Restaurant accepts an order' })
  // @UseGuards(AuthGuard)
  // @Patch('/:orderId/accept')
  // async ownerAcceptOrder(
  //   @Req() req: Request,
  //   @Param('orderId') orderId: string,
  // ) {
  //   const requester = req['authUser'] as UserOutput;
  //   await this.orderService.acceptOrder(orderId, requester.userId);
  // }

  // @ApiOperation({ summary: 'Restaurant marks an order ready' })
  // @UseGuards(AuthGuard)
  // @Patch('/:orderId/ready')
  // async ownerMarkOrderReady(
  //   @Req() req: Request,
  //   @Param('orderId') orderId: string,
  // ) {
  //   const requester = req['authUser'] as UserOutput;
  //   await this.orderService.markOrderReady(orderId, requester.userId);
  // }

  // @ApiOperation({ summary: 'Driver accepts delivering an order' })
  // @UseGuards(AuthGuard)
  // @Patch('/:orderId/delivery/accept')
  // async driverAcceptOrder(
  //   @Req() req: Request,
  //   @Param('orderId') orderId: string,
  // ) {
  //   const requester = req['authUser'] as UserOutput;
  //   await this.orderService.driverAcceptOrder(orderId, requester.userId);
  // }

  // @ApiOperation({ summary: 'Driver declines delivering an order' })
  // @UseGuards(AuthGuard)
  // @Patch('/:orderId/delivery/decline')
  // async driverDeclineOrder(
  //   @Req() req: Request,
  //   @Param('orderId') orderId: string,
  // ) {
  //   const requester = req['authUser'] as UserOutput;
  //   await this.orderService.driverDeclineOrder(orderId, requester.userId);
  // }

  // @ApiOperation({ summary: 'Driver picks up an order' })
  // @UseGuards(AuthGuard)
  // @Patch('/:orderId/delivery/pickup')
  // async driverPickupOrder(
  //   @Req() req: Request,
  //   @Param('orderId') orderId: string,
  // ) {
  //   const requester = req['authUser'] as UserOutput;
  //   await this.orderService.driverPickupOrder(orderId, requester.userId);
  // }

  // @ApiOperation({ summary: 'Driver completes deliverying an order' })
  // @UseGuards(AuthGuard)
  // @Patch('/:orderId/delivery/complete')
  // async driverCompleteDelivery(
  //   @Req() req: Request,
  //   @Param('orderId') orderId: string,
  // ) {
  //   const requester = req['authUser'] as UserOutput;
  //   await this.orderService.driverCompleteDelivery(orderId, requester.userId);
  // }
}
