import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/userRole';
import { UserOutput } from 'src/user/dto/user-output';
import { AuthGuard } from 'src/auth/auth.guard';
import { MenuRankingDTO } from 'src/dish/types/menu-ranking-data';
import { GetOwnerDashBoardPageDTO } from '../dto/get-owner-dashboard-page.dto';
import { OrderKpiService } from '../service/order.kpi.service';

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
    const { userId } = req['authUser'] as UserOutput;
    return await this.service.getMenuRankings(userId, limit);
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
    return await this.service.getOwnerDashBoardPage(userId, range);
  }
}
