import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RestaurantEntity } from './restaurant/orm-entities/restaurant.orm.entity';
import { DishEntity } from './restaurant/orm-entities/dish.orm.entity';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthController } from './user/controller/auth.controller';
import { UserEntity } from './user/user.orm.entity';
import { ClientEntity } from './user/orm-entities/client.orm.entity';
import { OwnerEntity } from './user/orm-entities/owner.orm.entity';
import { DriverEntity } from './user/orm-entities/driver.orm.entity';
import { OrderItemEntity } from './order/orm-entities/order-item.orm.entity';
import { RejectedDeliveryOrderEntity } from './order/rejected-delivery-order.orm.entity';
import { OrderEntity } from './order/orm-entities/order.orm.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development.local',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        UserEntity,
        ClientEntity,
        OwnerEntity,
        DriverEntity,
        RestaurantEntity,
        OrderEntity,
        DishEntity,
        OrderItemEntity,
        RejectedDeliveryOrderEntity,
      ],
      synchronize: true,
    }),
    RestaurantModule,
    UserModule,
    OrderModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
