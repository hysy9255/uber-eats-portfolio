import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { OwnerRepository } from './owner.repository';
import { CreateRestaurantDTO } from 'src/restaurant/dto/create-restaurant.dto';
import { RestaurantRegisterService } from 'src/restaurant/service/restaurant.register.service';
import { DishRegisterService } from 'src/dish/dish.register.service';

@Injectable()
export class OwnerOnBoardService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly ownerRepo: OwnerRepository,
    private readonly restaurant: RestaurantRegisterService,
    private readonly dish: DishRegisterService,
  ) {}

  async onBoard(
    userId: string,
    { restaurantSummary: restaurant, dishes }: CreateRestaurantDTO,
  ) {
    const ownerId = this.sharedService.generateId();
    await this.ownerRepo.save(userId, ownerId);

    const { restaurantId } = await this.restaurant.register(
      ownerId,
      restaurant,
    );
    if (dishes) await this.dish.register(restaurantId, dishes);
  }
}
