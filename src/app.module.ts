import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { RestaurantEntity } from './restaurant/orm-entities/restaurant.orm.entity';
import { DishEntityV2 } from './restaurant/orm-entities/dish.orm.entity';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { UserEntity } from './user/user.orm.entity';
import { ClientEntity } from './user/orm-entities/client.orm.entity';
import { OwnerEntity } from './user/orm-entities/owner.orm.entity';
import { DriverEntity } from './user/orm-entities/driver.orm.entity';
import { OrderItemEntity } from './order/orm-entities/order-item.orm.entity';

import { OrderEntity } from './order/orm-entities/order.orm.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleWare } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { SharedModule } from './shared/shared.module';
import { RejectedDeliveryOrderEntity } from './order/orm-entities/rejected-delivery-order.orm.entity';
import { UploadsController } from './uploads/uploads.controller';
import { OwnerDraftModule } from './owner-draft/owner-draft.module';
// import { CustomerEntity } from './user/orm-entities/customer.orm.entity';
import { RestaurantEntityV2 } from './restaurant/orm-entities/restaurantV2.orm.entity';
import { OperatingHoursEntity } from './restaurant/orm-entities/operatingHours.entity';
import { VehicleEntity } from './user/orm-entities/vehicle.orm.entity';
import { DriverDocsEntity } from './user/orm-entities/driver.document.entity';

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
        VehicleEntity,
        DriverDocsEntity,
        UserEntity,
        ClientEntity,
        OwnerEntity,
        DriverEntity,
        RestaurantEntityV2,
        OperatingHoursEntity,
        OrderEntity,
        DishEntityV2,
        OrderItemEntity,
        RejectedDeliveryOrderEntity,
        // CustomerEntity,
      ],
      synchronize: true,
    }),
    RestaurantModule,
    UserModule,
    OrderModule,
    JwtModule,
    AuthModule,
    BcryptModule,
    SharedModule,
    OwnerDraftModule,
  ],
  controllers: [UploadsController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    // { path: 'graphql', method: RequestMethod.POST },
    // { path: '/api/*path', method: RequestMethod.ALL },
  }
}
