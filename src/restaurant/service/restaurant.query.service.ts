import { Injectable } from '@nestjs/common';
import { RestaurantViewDTO } from '../dto/restaurants-view.dto';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { RestaurantNameAndLogoDTO } from '../dto/restaurant-name.dto';
import { RestaurantsViewMapper } from '../mapper/restaurants-view-mapper';

@Injectable()
export class RestaurantQueryService {
  constructor(
    private readonly repo: RestaurantRepository,
    private readonly mapper: RestaurantsViewMapper,
  ) {}

  async getRestaurantViews(): Promise<RestaurantViewDTO[]> {
    const rows = await this.repo.find();
    return this.mapper.toDTO(rows);
  }

  async getRestaurantViewById(
    restaurantId: string,
  ): Promise<RestaurantViewDTO> {
    const rows = await this.repo.findById(restaurantId);
    return this.mapper.toDTO(rows)[0];
  }

  async getRestaurantViewByOwner(ownerId: string): Promise<RestaurantViewDTO> {
    const rows = await this.repo.findByOwner(ownerId);
    return this.mapper.toDTO(rows)[0];
  }

  async getRestaurantNameAndLogo(
    restaurantId: string,
  ): Promise<RestaurantNameAndLogoDTO> {
    const row = await this.repo.findNameAndLogoById(restaurantId);
    if (!row) throw new Error('Name and logo not found');
    const { dba, logo } = row;
    return new RestaurantNameAndLogoDTO({
      restaurantName: dba,
      restaurantLogo: logo,
    });
  }
}
