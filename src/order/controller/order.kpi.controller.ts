import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/userRole';
import { OwnerUser } from 'src/auth/types/auth-user';
import { AuthGuard } from 'src/auth/auth.guard';
import { MenuRankingDTO } from 'src/dish/types/menu-ranking-data';
import { OwnerDashBoardPageDTO } from '../dto/response/owner-dashboard-page.dto';
import { OrderKpiService } from '../service/order.kpi.service';
import { AUTH_USER } from 'src/constants/variables';

@ApiSecurity('jwt-token')
@Controller('kpi/orders')
export class OrderKpiController {
  constructor(private readonly service: OrderKpiService) {}

  @ApiOperation({ summary: 'Get menu rankings' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get('/ranking')
  async menuRankings(
    @Req() req: Request,
    @Query('limit') limit: string,
  ): Promise<MenuRankingDTO> {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    return await this.service.getMenuRankings(ownerId, limit);
  }

  @ApiOperation({ summary: 'Get owner dashboard page' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get('/summary')
  async orderSummary(
    @Req() req: Request,
    @Query('range') range: string,
  ): Promise<OwnerDashBoardPageDTO> {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    return await this.service.getOwnerDashBoardPage(ownerId, range);
  }
}
