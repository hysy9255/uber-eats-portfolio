import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DailyRevenueDTO {
  @ApiProperty({
    example: '2026-05-01',
    description: 'Revenue date',
  })
  date: string;

  @ApiProperty({
    example: 120000,
    description: 'Revenue for the date',
  })
  revenue: number;
}

export class OrderKpiDTO {
  @ApiProperty({
    example: 120,
    description: 'Number of orders',
  })
  numOfOrders: number;

  @ApiProperty({
    example: 3500000,
    description: 'Total revenue',
  })
  revenue: number;

  @ApiProperty({
    example: 29166,
    description: 'Average order amount',
  })
  avgOrder: number;

  @ApiProperty({
    example: 34,
    description: 'Number of reviews',
  })
  numOfReviews: number;
}

export class RevenueStatsDTO {
  @ApiPropertyOptional({
    example: 12.5,
    description: 'Revenue percent change compared to previous period',
  })
  percentChange?: number;

  @ApiProperty({
    type: [DailyRevenueDTO],
    description: 'Daily revenue graph data',
  })
  revenueGraphData: DailyRevenueDTO[];
}

export class OwnerDashBoardPageDTO {
  @ApiProperty({ type: OrderKpiDTO })
  orderKpi: OrderKpiDTO;

  @ApiProperty({ type: RevenueStatsDTO })
  revenueStats: RevenueStatsDTO;
}
