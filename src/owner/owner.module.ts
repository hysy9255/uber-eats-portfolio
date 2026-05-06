import { Module } from '@nestjs/common';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { DishModule } from 'src/dish/dish.module';
import { OwnerOnBoardService } from './service/owner.onboard.service';

@Module({
  imports: [RestaurantModule, DishModule],
  providers: [OwnerOnBoardService],
  exports: [OwnerOnBoardService],
})
export class OwnerModule {}
