import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { OrderRepository } from './repository/order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orm-entities/order.orm.entity';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { OrderItemEntity } from './orm-entities/order-item.orm.entity';
import { OrderItemRepository } from './repository/orderItem.repository';

@Module({
  imports: [
    RestaurantModule,
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {}
