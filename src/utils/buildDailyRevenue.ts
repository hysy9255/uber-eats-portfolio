import { DailyRevenueDTO } from 'src/order/dto/response/owner-dashboard-page.dto';
import { ReadOrderData } from 'src/order/types/read-order-data';

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function buildDailyRevenue(
  orders: ReadOrderData[],
  startDate: Date,
  endDate: Date,
): DailyRevenueDTO[] {
  const revenueMap = new Map<string, number>();

  for (const order of orders) {
    const dateKey = formatLocalDate(order.createdAt);
    const price = Number(order.totalPrice);
    revenueMap.set(dateKey, (revenueMap.get(dateKey) ?? 0) + price);
  }

  const result: DailyRevenueDTO[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const dateKey = formatLocalDate(current);

    result.push({
      date: dateKey,
      revenue: revenueMap.get(dateKey) ?? 0,
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}
