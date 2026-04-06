import { DailyRevenue } from 'src/utils/buildDailyRevenue';

export class GetOwnerDashBoardPageDTO {
  orderKpi: {
    numOfOrders: number;
    revenue: number;
    avgOrder: number;
    numOfReviews: number;
  };
  revenueStats: {
    percentChange?: number;
    revenueGraphData: DailyRevenue[];
  };
}
