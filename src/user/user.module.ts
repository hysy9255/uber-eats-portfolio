import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.orm.entity';
import { UserRepository } from './repository/user.repository';
import { OwnerEntity } from './orm-entities/owner.orm.entity';
import { ClientEntity } from './orm-entities/client.orm.entity';
import { DriverEntity } from './orm-entities/driver.orm.entity';
import { JwtModule } from 'src/jwt/jwt.module';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClientRepository } from './repository/client.repository';
import { DriverRepository } from './repository/driver.repository';
import { OwnerRepository } from './repository/owner.repository';
import { UserDomainService } from './service/user.domain.service';
import { ClientIdReader } from './repository/reader/client.id.reader';
import { DriverIdReader } from './repository/reader/driver.id.reader';
import { RestaurantIdReader } from './repository/reader/restaurant.id.reader';
import { RestaurantEntity } from 'src/restaurant/orm-entities/restaurant.orm.entity';
import { CustomerRepository } from './repository/\bcustomer.repository';
import { CustomerEntity } from './orm-entities/customer.orm.entity';
import { RestaurantService } from 'src/restaurant/service/restaurant.service';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { DishService } from 'src/restaurant/service/dish.service';
import { DishRepository } from 'src/restaurant/repository/dish.repository';
import {
  DishEntity,
  DishEntityV2,
} from 'src/restaurant/orm-entities/dish.orm.entity';
import { RestaurantEntityV2 } from 'src/restaurant/orm-entities/restaurantV2.orm.entity';
import { DishRepositoryV2 } from 'src/restaurant/repository/dish.repositoryV2';
import { OperatingHoursEntity } from 'src/restaurant/orm-entities/operatingHours.entity';
import { DriverRegistration } from './service/driver.registration';
import { VehicleEntity } from './orm-entities/vehicle.orm.entity';
import { DriverDocsEntity } from './orm-entities/driver.document.entity';
import { VehicleRepository } from './repository/vehicle.repository';
import { DriverDocsRepository } from './repository/driver.docs.repository';

const services = [
  UserService,
  UserDomainService,
  RestaurantService,
  DishService,
  DriverRegistration,
];
const repositories = [
  ClientRepository,
  DriverRepository,
  OwnerRepository,
  CustomerRepository,
  RestaurantRepository,
  OwnerRepository,
  DishRepository,
  DishRepositoryV2,
  VehicleRepository,
  DriverDocsRepository,
];
const readers = [ClientIdReader, DriverIdReader, RestaurantIdReader];
const entities = [
  UserEntity,
  OwnerEntity,
  ClientEntity,
  DriverEntity,
  RestaurantEntity,
  CustomerEntity,
  DishEntity,
  RestaurantEntityV2,
  DishEntityV2,
  OperatingHoursEntity,
  VehicleEntity,
  DriverDocsEntity,
];

@Module({
  imports: [
    AuthModule,
    SharedModule,
    JwtModule,
    BcryptModule,
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [UserController],
  providers: [...services, ...repositories, UserRepository, ...readers],
  exports: [...services, ...repositories, ...readers],
})
export class UserModule {}
