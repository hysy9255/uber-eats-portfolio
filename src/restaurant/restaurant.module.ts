import { Module } from '@nestjs/common';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantService } from './service/restaurant.service';
import { RestaurantRepository } from './repository/restaurant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './orm-entities/restaurant.orm.entity';
import { DishEntity } from './orm-entities/dish.orm.entity';
import { DishRepository } from './repository/dish.repository';
import { AuthModule } from 'src/auth/auth.module';
import { DishController } from './controller/dish.controller';
import { DishService } from './service/dish.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([RestaurantEntity, DishEntity]),
  ],
  controllers: [RestaurantController, DishController],
  providers: [
    RestaurantService,
    RestaurantRepository,
    DishService,
    DishRepository,
  ],
  exports: [RestaurantRepository, DishRepository],
})
export class RestaurantModule {}
