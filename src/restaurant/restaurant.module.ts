import { Module } from '@nestjs/common';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantRepository } from './repository/restaurant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingHoursEntity } from './orm-entities/operatingHours.entity';
import { RestaurantEntity } from './orm-entities/restaurants.orm.entity';
import { RestaurantExternalService } from './service/restaurant.external.service';
import { OwnerModule } from 'src/owner/owner.module';
import { RestaurantMapper } from './mapper/restaurant.mapper';
import { RestaurantAddressEntity } from './orm-entities/restaurantAddress.entity';
import { RestaurantAddressRepository } from './repository/restaurant-address.repository';
import { OperatingHoursRepository } from './repository/operating-hours.repository';
import { RestaurantAddressMapper } from './mapper/restaurant-address.mapper';
import { OperatingHoursMapper } from './mapper/operating-hours.mapper';
import { DishInternalModule } from 'src/dish/dish-internal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantEntity,
      RestaurantAddressEntity,
      OperatingHoursEntity,
    ]),
    OwnerModule,
    DishInternalModule,
  ],
  controllers: [RestaurantController],
  providers: [
    RestaurantExternalService,
    RestaurantRepository,
    RestaurantAddressRepository,
    OperatingHoursRepository,
    RestaurantMapper,
    RestaurantAddressMapper,
    OperatingHoursMapper,
  ],
})
export class RestaurantModule {}
