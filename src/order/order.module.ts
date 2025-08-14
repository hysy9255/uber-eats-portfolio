import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { OrderRepository } from './repository/order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orm-entities/order.orm.entity';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { OrderItemEntity } from './orm-entities/order-item.orm.entity';
import { OrderItemRepository } from './repository/orderItem.repository';
import { AuthModule } from 'src/auth/auth.module';
import { OwnerEntity } from 'src/user/orm-entities/owner.orm.entity';
import { DishEntity } from 'src/restaurant/orm-entities/dish.orm.entity';
import { OrderDomainService } from './service/order.domain.service';
import { DishRepository } from 'src/restaurant/repository/dish.repository';
import { UserModule } from 'src/user/user.module';

const entities = [
  OrderEntity,
  OrderItemEntity,
  DishEntity,
  OwnerEntity,
  // RestaurantEntity,
];

const repositories = [OrderRepository, OrderItemRepository, DishRepository];

@Module({
  imports: [
    AuthModule,
    UserModule,
    RestaurantModule,
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderDomainService, ...repositories],
})
export class OrderModule {}
