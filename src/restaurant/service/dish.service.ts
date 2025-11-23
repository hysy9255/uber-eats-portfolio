import { Injectable } from '@nestjs/common';
import { MenuInput, UpdateDishInput } from '../dto/dish-input';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { OwnerRepository } from 'src/user/repository/owner.repository';
import { SharedService } from 'src/shared/shared.service';
import { CreateMenuInput } from '../orm-entities/dish.orm.entity';
import { DishRepositoryV2 } from '../repository/dish.repositoryV2';

@Injectable()
export class DishService {
  constructor(
    private readonly dishRepositoryV2: DishRepositoryV2,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly sharedService: SharedService,
  ) {}

  async createMenus(userId: string, menuItems: MenuInput[]) {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }

    const restaurant =
      await this.restaurantRepository.getRestaurantByOwnerIdV2(ownerId);

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const createBulkMenusInput = menuItems.map((item) => ({
      dishId: this.sharedService.generateId(),
      restaurantId: restaurant.restaurantId,
      name: item.name,
      price: Number(item.price),
      description: item.description,
      category: item.category,
      dishImgUrl: item.dishImgUrl,
    })) as CreateMenuInput[];

    await this.dishRepositoryV2.bulkSaveDishes(createBulkMenusInput);
  }

  listByRestaurant(restaurantId: string) {
    return this.dishRepositoryV2.findManyByRestaurantId(restaurantId);
  }

  getDishesV2(restaurantId: string) {
    return this.dishRepositoryV2.findManyByRestaurantId(restaurantId);
  }

  getDishV2(id: string) {
    return this.dishRepositoryV2.findOneById(id);
  }

  async updateDishV2(
    userId: string,
    dishId: string,
    { name, price, description, category, dishImgUrl }: UpdateDishInput,
  ) {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }

    const restaurant =
      await this.restaurantRepository.getRestaurantByOwnerIdV2(ownerId);

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const dish = await this.dishRepositoryV2.findOneById(dishId);
    if (!dish) {
      throw new Error('Dish does not exist');
    }

    if (dish.restaurantId !== restaurant.restaurantId) {
      throw new Error('Dish does not belong to this restaurant');
    }

    await this.dishRepositoryV2.updateOneById({
      dishId: dishId,
      name: name,
      price: price,
      description: description,
      category: category,
      dishImgUrl: dishImgUrl,
    });
  }

  async deleteDishV2(userId: string, dishId: string) {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }

    const restaurant =
      await this.restaurantRepository.getRestaurantByOwnerIdV2(ownerId);

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const dish = await this.dishRepositoryV2.findOneById(dishId);
    if (!dish) {
      throw new Error('Dish does not exist');
    }

    if (dish.restaurantId !== restaurant.restaurantId) {
      throw new Error('Dish does not belong to this restaurant');
    }
    await this.dishRepositoryV2.deleteOneById(dishId);
  }
}
