import { Module } from '@nestjs/common';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantRepository } from './repository/restaurant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingHoursEntity } from './orm-entities/operatingHours.entity';
import { RestaurantEntity } from './orm-entities/restaurants.orm.entity';
import { OwnerModule } from 'src/owner/owner.module';
import { RestaurantMapper } from './mapper/restaurant.mapper';
import { RestaurantAddressEntity } from './orm-entities/restaurantAddress.entity';
import { RestaurantAddressRepository } from './repository/restaurant-address.repository';
import { OperatingHoursRepository } from './repository/operating-hours.repository';
import { RestaurantAddressMapper } from './mapper/restaurant-address.mapper';
import { OperatingHoursMapper } from './mapper/operating-hours.mapper';
import { DishInternalModule } from 'src/dish/dish-internal.module';
import { RestaurantPageDTOAssembler } from './assembler/restaurant-page-dto.assembler';
import { BusinessInfoDTOAssembler } from './assembler/business-info-dto.assembler';
import { RestaurantLoader } from './service/restaurant.loader';
import { RestaurantCommandService } from './service/restaurant.command.service';
import { RestaurantQueryService } from './service/restaurant.query.service';
import { RestaurantRegisterService } from './service/restaurant.register.service';

const respositories = [
  RestaurantRepository,
  RestaurantAddressRepository,
  OperatingHoursRepository,
];

const mappers = [
  RestaurantMapper,
  RestaurantAddressMapper,
  OperatingHoursMapper,
];

const assemblers = [BusinessInfoDTOAssembler, RestaurantPageDTOAssembler];

const services = [
  RestaurantCommandService,
  RestaurantQueryService,
  RestaurantLoader,
  RestaurantRegisterService,
];

const entities = [
  RestaurantEntity,
  RestaurantAddressEntity,
  OperatingHoursEntity,
];

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    OwnerModule,
    DishInternalModule,
  ],
  controllers: [RestaurantController],
  providers: [...respositories, ...mappers, ...assemblers, ...services],
  exports: [RestaurantRegisterService],
})
export class RestaurantModule {}
