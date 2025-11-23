import { Module } from '@nestjs/common';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantService } from './service/restaurant.service';
import { RestaurantRepository } from './repository/restaurant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './orm-entities/restaurant.orm.entity';
import { DishEntity, DishEntityV2 } from './orm-entities/dish.orm.entity';
import { DishRepository } from './repository/dish.repository';
import { AuthModule } from 'src/auth/auth.module';
import { DishController } from './controller/dish.controller';
import { DishService } from './service/dish.service';
import { UserModule } from 'src/user/user.module';
import { RestaurantEntityV2 } from './orm-entities/restaurantV2.orm.entity';
import { DishRepositoryV2 } from './repository/dish.repositoryV2';
import { OperatingHoursEntity } from './orm-entities/operatingHours.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([
      RestaurantEntity,
      DishEntity,
      DishEntityV2,
      RestaurantEntityV2,
      OperatingHoursEntity,
    ]),
  ],
  controllers: [RestaurantController, DishController],
  providers: [
    RestaurantService,
    RestaurantRepository,
    DishService,
    DishRepository,
    DishRepositoryV2,
  ],
  exports: [RestaurantRepository, DishRepository],
})
export class RestaurantModule {}
