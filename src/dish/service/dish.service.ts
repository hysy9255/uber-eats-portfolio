import { Injectable, NotFoundException } from '@nestjs/common';
import { DishPageDTO } from '../dto/response/dish-page.dto';
import { CreateDishDTO } from '../dto/request/create-dish.dto';
import { DishDTO } from '../dto/response/dish.dto';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { DishDTOAssembler } from '../assembler/dish-dto.assembler';
import { DishMapper } from '../mapper/dish.mapper';
import { DishRepository } from '../repository/dish.repository';
import { DishValidationService } from './dish.validation.service';
import { UpdateDishDTO } from '../dto/request/update-dish.dto';

@Injectable()
export class DishService {
  constructor(
    private readonly dishMapper: DishMapper,
    private readonly dishRepo: DishRepository,
    private readonly restaurantRepo: RestaurantRepository,
    private readonly validation: DishValidationService,
    private readonly assembler: DishDTOAssembler,
  ) {}

  async getDishes(restaurantId: string): Promise<DishDTO[]> {
    const dishes = await this.dishRepo.findByRestaurant(restaurantId);
    return dishes.map((dish) => {
      return this.dishMapper.readDataToDTO(dish);
    });
  }

  async getDishPage(dishId: string): Promise<DishPageDTO> {
    try {
      const dish = await this.dishRepo.findOneById(dishId);
      const restaurantId = dish.restaurantId;

      const restaurantNameAndLogo =
        await this.restaurantRepo.findNameAndLogoById(restaurantId);
      if (!restaurantNameAndLogo)
        throw new Error('Restaurant Name and Logo not found');
      const dishes = await this.dishRepo.findByRestaurant(restaurantId);

      return this.assembler.buildDishPage(dish, dishes, restaurantNameAndLogo);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Dish Page Not Found');
    }
  }

  async createDish(ownerId: string, dto: CreateDishDTO) {
    const { restaurantId } = await this.restaurantRepo.findOneByOwner(ownerId);
    await this.dishRepo.save(
      this.dishMapper.dtoToCreateDishData(restaurantId, dto),
    );
  }

  async updateDish(ownerId: string, dishId: string, dto: UpdateDishDTO) {
    await this.validation.updateDish(ownerId, dishId);
    const updateDishData = this.dishMapper.dtoToUpdateDishData(dishId, dto);
    await this.dishRepo.update(updateDishData);
  }

  async deleteDish(ownerId: string, dishId: string) {
    await this.validation.deleteDish(ownerId, dishId);
    await this.dishRepo.delete(dishId);
  }
}
