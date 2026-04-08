import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './driver/orm-entities/vehicle.orm.entity';
import { DriverDocsEntity } from './driver/orm-entities/driver.document.entity';
import { UserEntity } from './user/user.orm.entity';
import { OwnerEntity } from './owner/owner.orm.entity';
import { DriverEntity } from './driver/orm-entities/driver.orm.entity';
import { RestaurantEntity } from './restaurant/orm-entities/restaurants.orm.entity';
import { RestaurantAddressEntity } from './restaurant/orm-entities/restaurantAddress.entity';
import { OperatingHoursEntity } from './restaurant/orm-entities/operatingHours.entity';
import { OrderEntity } from './order/orm-entities/order.orm.entity';
import { DishEntity } from './dish/orm-entities/dish.orm.entity';
import { OrderItemEntity } from './order/orm-entities/order-item.orm.entity';
import { RejectedDeliveryOrderEntity } from './order/orm-entities/rejected-delivery-order.orm.entity';
import { JwtMiddleWare } from './jwt/jwt.middleware';
import { UploadsController } from './uploads/uploads.controller';
import { UserInternalModule } from './user/user-internal.module';
import { DishInternalModule } from './dish/dish-internal.module';
import { RestaurantInternalModule } from './restaurant/restaurant-internal.module';
import { DishModule } from './dish/dish.module';
import { DriverModule } from './driver/driver.module';
import { OwnerModule } from './owner/owner.module';
import { RegistrationModule } from './registration/registration.module';
import { OwnerDraftModule } from './owner-draft/owner-draft.module';
import { SharedModule } from './shared/shared.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ClientEntity } from './client/orm-entity/client.orm.entity';
import { DeliveryAddressEntity } from './client/orm-entity/delivery-address.orm.entity';
import { ClientModule } from './client/module/client.module';
import { DeliveryAddressSnapshotEntity } from './order/orm-entities/delivery-address-snapshot.orm.entity';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env.development.local',
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        VehicleEntity,
        DriverDocsEntity,
        UserEntity,
        OwnerEntity,
        DriverEntity,
        ClientEntity,
        DeliveryAddressEntity,
        DeliveryAddressSnapshotEntity,
        RestaurantEntity,
        RestaurantAddressEntity,
        OperatingHoursEntity,
        OrderEntity,
        DishEntity,
        OrderItemEntity,
        RejectedDeliveryOrderEntity,
      ],
      synchronize: true,
    }),
    JwtModule,
    AuthModule,
    BcryptModule,
    SharedModule,
    OwnerDraftModule,
    RegistrationModule,
    DishModule,
    RestaurantInternalModule,
    DishInternalModule,
    UserInternalModule,
    UserModule,
    OwnerModule,
    ClientModule,
    DriverModule,
    RestaurantModule,
    OrderModule,
    HealthModule,
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
