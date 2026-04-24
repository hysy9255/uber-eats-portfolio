import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/userRole';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { UserOutput } from 'src/user/dto/user-output';
import { GetOrderForClientDTO } from '../dto/get-order-for-client.dto';
import {
  FINISHED_ORDER_STATUSES,
  ONGOING_ORDER_STATUSES,
} from 'src/constants/orderStatuses';
import { ClientOrderCommandService } from '../service/client.order.command.service';
import { ClientOrderQueryService } from '../service/client.order.query.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiSecurity('jwt-token')
@Controller('client/orders')
export class ClientOrderController {
  constructor(
    private readonly command: ClientOrderCommandService,
    private readonly query: ClientOrderQueryService,
  ) {}

  @ApiOperation({ summary: 'Client makes an order' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Post()
  async createOrder(
    @Req() req: Request,
    @Body() dto: CreateOrderDTO,
  ): Promise<{ orderId: string }> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.command.create(userId, dto);
  }

  @ApiOperation({ summary: 'Client gets an order' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('detail/:orderId')
  async getOrderForClient(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ): Promise<GetOrderForClientDTO> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.query.order(userId, orderId);
  }

  @ApiOperation({ summary: 'Client gets on-going orders' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('/ongoing')
  async getOnGoingOrdersForClient(
    @Req() req: Request,
  ): Promise<GetOrderForClientDTO[]> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.query.orders(userId, ONGOING_ORDER_STATUSES);
  }

  @ApiOperation({ summary: 'Client gets completed orders' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('/history')
  async getOrderHistoryForClient(
    @Req() req: Request,
  ): Promise<GetOrderForClientDTO[]> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.query.orders(userId, FINISHED_ORDER_STATUSES);
  }
}
