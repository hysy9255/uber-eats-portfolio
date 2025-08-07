import { Module } from '@nestjs/common';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantService } from './service/restaurant.service';
import { RestaurantRepository } from './repository/restaurant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './orm-entities/restaurant.orm.entity';
import { UserModule } from 'src/user/user.module';
import { DishEntity } from './orm-entities/dish.orm.entity';
import { DishRepository } from './repository/dish.repository';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([RestaurantEntity, DishEntity]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository, DishRepository],
  exports: [RestaurantRepository, DishRepository],
})
export class RestaurantModule {}
