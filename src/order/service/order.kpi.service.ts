import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { GetOwnerDashBoardPageDTO } from '../dto/get-owner-dashboard-page.dto';
import { buildDailyRevenue } from 'src/utils/buildDailyRevenue';
import { MenuRankingDTO } from 'src/dish/types/menu-ranking-data';
import {
  generateDateRange,
  generateTwoDateRanges,
} from 'src/utils/generateDateRange';
import { calculateAvgOrder } from 'src/utils/calculateAvgOrder';
import { calculateRevenue } from 'src/utils/calculateRevenue';
import { OrderStatsRepository } from '../repository/order.stats.repository';
import { OrderStatus } from 'src/constants/orderStatus';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';

@Injectable()
export class OrderKpiService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orderStatsRepo: OrderStatsRepository,
    private readonly restaurantRepo: RestaurantRepository,
  ) {}

  async revenuePercentChange(restaurantId: string, range: string) {
    const {
      firstHalfStartDate,
      firstHalfEndDate,
      secondHalfStartDate,
      secondHalfEndDate,
    } = generateTwoDateRanges(range);

    const firstHalfOrders = await this.orderRepo.findInDateRange(
      restaurantId,
      firstHalfStartDate,
      firstHalfEndDate,
      OrderStatus.Delivered,
    );

    const secondHalfOrders = await this.orderRepo.findInDateRange(
      restaurantId,
      secondHalfStartDate,
      secondHalfEndDate,
      OrderStatus.Delivered,
    );

    const firstHalfRevenue = calculateRevenue(firstHalfOrders);

    const secondHalfRevenue = calculateRevenue(secondHalfOrders);

    const percentage =
      ((firstHalfRevenue - secondHalfRevenue) / secondHalfRevenue) * 100;

    return percentage;
  }

  async getOwnerDashBoardPage(
    ownerId: string,
    range: string,
  ): Promise<GetOwnerDashBoardPageDTO> {
    const { restaurantId } = await this.restaurantRepo.findOneByOwner(ownerId);

    const { startDate, endDate } = generateDateRange(range);

    const orders = await this.orderRepo.findInDateRange(
      restaurantId,
      startDate,
      endDate,
      OrderStatus.Delivered,
    );

    const dailyRevenue = buildDailyRevenue(orders, startDate, endDate);
    const revenue = calculateRevenue(orders);
    const avgOrder = calculateAvgOrder(orders, revenue);
    const percentChange = await this.revenuePercentChange(restaurantId, range);

    return {
      orderKpi: {
        numOfOrders: orders.length,
        revenue,
        avgOrder,
        numOfReviews: 3,
      },
      revenueStats: {
        percentChange,
        revenueGraphData: dailyRevenue,
      },
    };
  }

  async getMenuRankings(
    ownerId: string,
    limit: string,
  ): Promise<MenuRankingDTO> {
    const { restaurantId } = await this.restaurantRepo.findOneByOwner(ownerId);

    const topOrders = await this.orderStatsRepo.findTopDishesByQuantity(
      restaurantId,
      Number(limit),
      'DESC',
    );
    const leastOrders = await this.orderStatsRepo.findTopDishesByQuantity(
      restaurantId,
      Number(limit),
      'ASC',
    );

    return { topOrders, leastOrders };
  }
}
