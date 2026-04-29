import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { UserRole } from 'src/constants/userRole';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateOrderStatusDTO } from '../dto/update-order-status.dto';
import { OrderStatus } from 'src/constants/orderStatus';
import { GetOrderForOwnerDTO } from '../dto/get-order-for-owner.dto';
import { OwnerOrderCommandService } from '../service/owner.order.command.service';
import { OwnerOrderQueryService } from '../service/owner.order.query.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AUTH_USER } from 'src/constants/variables';
import { OwnerUser } from 'src/user/types/auth-user';

@ApiSecurity('jwt-token')
@Controller('owner/orders')
export class OwnerOrderController {
  constructor(
    private readonly command: OwnerOrderCommandService,
    private readonly query: OwnerOrderQueryService,
  ) {}

  @ApiOperation({ summary: 'Owner updates order status' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Patch('/:orderId/status')
  async updateOrderStatus(
    @Req() req: Request,
    @Param('orderId') orderId: string,
    @Body() { status }: UpdateOrderStatusDTO,
  ) {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    await this.command.update(orderId, ownerId, status);
  }

  @ApiOperation({ summary: 'Owner get orders' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get()
  getOrdersForOwner(
    @Req() req: Request,
    @Query('status') status?: OrderStatus,
  ): Promise<GetOrderForOwnerDTO[]> {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    return this.query.orders(ownerId, status);
  }
}
