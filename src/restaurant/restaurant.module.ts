import { Module } from '@nestjs/common';
import { RestaurantRepository } from './repository/restaurant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingHoursEntity } from './orm-entity/operatingHours.entity';
import { RestaurantEntity } from './orm-entity/restaurants.orm.entity';
import { RestaurantMapper } from './mapper/restaurant.mapper';
import { RestaurantAddressEntity } from './orm-entity/restaurantAddress.entity';
import { RestaurantAddressRepository } from './repository/restaurant-address.repository';
import { OperatingHoursRepository } from './repository/operating-hours.repository';
import { RestaurantAddressMapper } from './mapper/restaurant-address.mapper';
import { OperatingHoursMapper } from './mapper/operating-hours.mapper';
import { RestaurantCommandService } from './service/restaurant.command.service';
import { RestaurantQueryService } from './service/restaurant.query.service';
import { RestaurantRegisterService } from './service/restaurant.register.service';
import { RestaurantsViewMapper } from './mapper/restaurants-view-mapper';
import { RestaurantController } from './restaurant.controller';

const respositories = [
  RestaurantRepository,
  RestaurantAddressRepository,
  OperatingHoursRepository,
];

const mappers = [
  RestaurantMapper,
  RestaurantAddressMapper,
  OperatingHoursMapper,
  RestaurantsViewMapper,
];

const services = [
  RestaurantCommandService,
  RestaurantQueryService,
  RestaurantRegisterService,
];

const entities = [
  RestaurantEntity,
  RestaurantAddressEntity,
  OperatingHoursEntity,
];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [RestaurantController],
  providers: [...respositories, ...mappers, ...services],
  exports: [RestaurantRegisterService, RestaurantRepository],
})
export class RestaurantModule {}
