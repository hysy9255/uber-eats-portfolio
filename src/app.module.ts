import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './orm-entities/user.orm.entity';
import { ClientEntity } from './orm-entities/client.orm.entity';
import { OwnerEntity } from './orm-entities/owner.orm.entity';
import { RestaurantEntity } from './orm-entities/restaurant.orm.entity';
import { OrderEntity } from './orm-entities/order.orm.entity';
import { DishEntity } from './orm-entities/dish.orm.entity';
import { OrderItemEntity } from './orm-entities/order-item.orm.entity';
import { RejectedDeliveryOrderEntity } from './orm-entities/rejected-delivery-order.orm.entity';
import { DriverEntity } from './orm-entities/driver.orm.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
