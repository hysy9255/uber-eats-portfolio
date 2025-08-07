import { Injectable } from '@nestjs/common';
import { OrderItem } from '../dto/order-output';
import { DishRepository } from 'src/restaurant/repository/dish.repository';

@Injectable()
export class OrderDomainService {
  constructor(private readonly dishRepository: DishRepository) {}

  async calculateTotalPrice(orderItems: OrderItem[]) {
    const dishIds = orderItems.map((item) => item.dishId);
    const dishes = await this.dishRepository.getDishesByIds(dishIds);
    const totalPrice = orderItems.reduce((total, item) => {
      const dish = dishes.find((d) => d.dishId === item.dishId);
      if (dish) {
        return total + dish.price * item.quantity;
      }
      return total;
    }, 0);
    return totalPrice.toFixed(2);
  }
}
