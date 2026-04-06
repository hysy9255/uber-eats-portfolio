import { Module } from '@nestjs/common';
import { RestaurantInternalService } from './service/restaurant.internal.service';
import { RestaurantRepository } from './repository/restaurant.repository';
import { OperatingHoursRepository } from './repository/operating-hours.repository';
import { RestaurantAddressRepository } from './repository/restaurant-address.repository';
import { RestaurantMapper } from './mapper/restaurant.mapper';
import { OperatingHoursMapper } from './mapper/operating-hours.mapper';
import { RestaurantAddressMapper } from './mapper/restaurant-address.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './orm-entities/restaurants.orm.entity';
import { RestaurantAddressEntity } from './orm-entities/restaurantAddress.entity';
import { OperatingHoursEntity } from './orm-entities/operatingHours.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantEntity,
      RestaurantAddressEntity,
      OperatingHoursEntity,
    ]),
  ],
  providers: [
    RestaurantInternalService,
    RestaurantRepository,
    OperatingHoursRepository,
    RestaurantAddressRepository,
    RestaurantMapper,
    OperatingHoursMapper,
    RestaurantAddressMapper,
  ],
  exports: [RestaurantInternalService],
})
export class RestaurantInternalModule {}
