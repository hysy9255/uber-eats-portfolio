import { Injectable } from '@nestjs/common';

import { ReadDishData } from 'src/dish/types/read-dish-data';
import { OrderItem } from '../dto/create-order.dto';

@Injectable()
export class OrderDomainService {
  calculateTotalPrice(orderItems: OrderItem[], dishes: ReadDishData[]): number {
    const totalPrice = orderItems.reduce((total, item) => {
      const dish = dishes.find((d) => d.dishId === item.dishId);
      if (dish) {
        return total + dish.price * item.quantity;
      }
      return total;
    }, 0);
    return Number(totalPrice.toFixed(2));
  }
}
