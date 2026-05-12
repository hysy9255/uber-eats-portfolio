import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { RegisterRestaurantDTO } from 'src/restaurant/dto/register-restaurant.dto';
import { RestaurantRegisterService } from 'src/restaurant/service/restaurant.register.service';
import { DishRegisterService } from 'src/dish/service/dish.register.service';
import { OwnerRepository } from '../repository/owner.repository';

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
    { restaurant: rest, dishes }: RegisterRestaurantDTO,
  ) {
    const ownerId = this.sharedService.generateId();
    await this.ownerRepo.save(userId, ownerId);

    const { restaurantId } = await this.restaurant.register(ownerId, rest);
    if (dishes) await this.dish.register(restaurantId, dishes);
  }
}
