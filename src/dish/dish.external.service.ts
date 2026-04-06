import { Injectable, NotFoundException } from '@nestjs/common';
import { DishRepository } from './dish.repository';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { GetDishPageDTO } from './dto/get-dish-page.dto';
import { CreateDishDTO } from './dto/create-dish.dto';
import { RestaurantInternalService } from 'src/restaurant/service/restaurant.internal.service';
import { DishMapper } from './dish.mapper';
import { OwnerInternalService } from 'src/owner/owner.internal.service';
import { DishDTO } from './dto/dish.dto';

@Injectable()
export class DishExternalService {
  constructor(
    private readonly dishMapper: DishMapper,
    private readonly dishRepo: DishRepository,
    private readonly restaurantInternalService: RestaurantInternalService,
    private readonly ownerInternalService: OwnerInternalService,
  ) {}

  // done
  async getDishes(restaurantId: string): Promise<DishDTO[]> {
    const dishes = await this.dishRepo.findAllByRestaurantId(restaurantId);
    return dishes.map((dish) => {
      return this.dishMapper.readDataToDTO(dish);
    });
  }

  // done
  async getDishPage(dishId: string): Promise<GetDishPageDTO> {
    try {
      const dish = await this.dishRepo.findOneById(dishId);
      const restaurantId = dish.restaurantId;
      const { dba, logo } =
        await this.restaurantInternalService.getById(restaurantId);
      const dishes = await this.dishRepo.findAllByRestaurantId(restaurantId);

      const response = new GetDishPageDTO();
      response.restaurantName = dba;
      response.restaurantLogo = logo;
      response.dish = this.dishMapper.readDataToDTO(dish);
      response.dishes = dishes.map((dish) =>
        this.dishMapper.readDataToDTO(dish),
      );
      return response;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Dish Page Not Found');
    }
  }

  // done
  async createDish(userId: string, dto: CreateDishDTO) {
    const { ownerId } =
      await this.ownerInternalService.getOwnerIdByUserId(userId);
    const { restaurantId } =
      await this.restaurantInternalService.getByOwnerId(ownerId);
    const createDishData = this.dishMapper.dtoToCreateDishData(
      restaurantId,
      dto,
    );
    await this.dishRepo.saveOne(createDishData);
  }

  // done
  async updateDish(userId: string, dishId: string, dto: UpdateDishDTO) {
    const { ownerId } =
      await this.ownerInternalService.getOwnerIdByUserId(userId);
    const { restaurantId } =
      await this.restaurantInternalService.getByOwnerId(ownerId);
    const dish = await this.dishRepo.findOneById(dishId);
    if (dish.restaurantId !== restaurantId) {
      throw new Error('This dish does not belong to your restaurant');
    }
    const updateDishData = this.dishMapper.dtoToUpdateDishData(dishId, dto);
    await this.dishRepo.updateOne(updateDishData);
  }

  // done
  async deleteDish(userId: string, dishId: string) {
    const { ownerId } =
      await this.ownerInternalService.getOwnerIdByUserId(userId);
    const { restaurantId } =
      await this.restaurantInternalService.getByOwnerId(ownerId);
    const dish = await this.dishRepo.findOneById(dishId);
    if (dish.restaurantId !== restaurantId) {
      throw new Error('This dish does not belong to your restaurant');
    }
    await this.dishRepo.deleteOneById(dishId);
  }
}
