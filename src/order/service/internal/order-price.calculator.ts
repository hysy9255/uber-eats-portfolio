import { Injectable } from '@nestjs/common';
import { ReadDishData } from 'src/dish/types/read-dish-data';
import { CreateOrderItemDTO } from 'src/order/dto/request/create-order-item.dto';

@Injectable()
export class OrderPriceCalculator {
  constructor() {} // private readonly promotionRepo: PromotionRepository, // private readonly couponRepo: CouponRepository,

  calculateTotalPrice(
    orderItems: CreateOrderItemDTO[],
    dishes: ReadDishData[],
  ) {
    const totalPrice = orderItems.reduce((acc, cur) => {
      const dish = dishes.find((d) => d.dishId === cur.dishId);
      if (!dish) throw new Error('Dish Not Found');
      return dish.price * cur.quantity + acc;
    }, 0);

    return totalPrice;
  }
}
