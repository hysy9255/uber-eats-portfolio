import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './driver/orm-entity/vehicle.orm.entity';
import { DriverDocsEntity } from './driver/orm-entity/driver.document.entity';
import { UserEntity } from './user/orm-entity/user.orm.entity';
import { DriverEntity } from './driver/orm-entity/driver.orm.entity';
import { RestaurantEntity } from './restaurant/orm-entity/restaurants.orm.entity';
import { RestaurantAddressEntity } from './restaurant/orm-entity/restaurantAddress.entity';
import { OperatingHoursEntity } from './restaurant/orm-entity/operatingHours.entity';
import { OrderEntity } from './order/orm-entity/order.orm.entity';
import { DishEntity } from './dish/orm-entity/dish.orm.entity';
import { OrderItemEntity } from './order/orm-entity/order-item.orm.entity';
import { RejectedDeliveryOrderEntity } from './order/orm-entity/rejected-delivery-order.orm.entity';
import { JwtMiddleWare } from './jwt/jwt.middleware';
import { UploadsController } from './uploads/uploads.controller';
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
import { DeliveryAddressSnapshotEntity } from './order/orm-entity/delivery-address-snapshot.orm.entity';
import { HealthModule } from './health/health.module';
import { PersistenceModule } from './persistence/persistence.module';
import { ClientModule } from './client/client.module';
import { OwnerEntity } from './owner/orm-entity/owner.orm.entity';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env.development.local',
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
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
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid TypeORM options');
        }
        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
    JwtModule,
    AuthModule,
    BcryptModule,
    SharedModule,
    OwnerDraftModule,
    RegistrationModule,
    DishModule,
    UserModule,
    OwnerModule,
    ClientModule,
    DriverModule,
    RestaurantModule,
    OrderModule,
    HealthModule,
    PersistenceModule,
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
