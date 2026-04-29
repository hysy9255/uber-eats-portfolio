import { Injectable } from '@nestjs/common';
import { GetRestaurantsPageViewDTO } from '../dto/get-restaurants-page-view.dto';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { RestaurantAddressRepository } from '../repository/restaurant-address.repository';
import { OperatingHoursRepository } from '../repository/operating-hours.repository';
import { RestaurantPageDTOAssembler } from '../assembler/restaurant-page-dto.assembler';
import { GetRestaurantPageViewDTO } from '../dto/get-restaurant-page-view.dto';
import { DishRepository } from 'src/dish/dish.repository';
import { GetRestaurantNameAndLogoDTO } from '../dto/get-restaurant-name.dto';
import { BusinessInfoDTO } from '../dto/get-my-restaurant-for-owner-dashboard.dto';
import { BusinessInfoDTOAssembler } from '../assembler/business-info-dto.assembler';

@Injectable()
export class RestaurantQueryService {
  constructor(
    private readonly restaurantRepo: RestaurantRepository,
    private readonly addressRepo: RestaurantAddressRepository,
    private readonly hoursRepo: OperatingHoursRepository,
    private readonly dishRepo: DishRepository,

    private readonly restaurantPageDTOAssembler: RestaurantPageDTOAssembler,
    private readonly assembler: BusinessInfoDTOAssembler,
  ) {}

  async getRestaurantsPage(): Promise<GetRestaurantsPageViewDTO> {
    const restaurants = await this.restaurantRepo.find();
    const restaurantIds = restaurants.map((r) => r.restaurantId);
    const addresses = await this.addressRepo.findByRestaurants(restaurantIds);
    const hours = await this.hoursRepo.findByRestaurants(restaurantIds);

    return this.restaurantPageDTOAssembler.buildMany(
      restaurants,
      hours,
      addresses,
    );
  }

  async getRestaurantPage(
    restaurantId: string,
  ): Promise<GetRestaurantPageViewDTO> {
    const restaurant = await this.restaurantRepo.findOneById(restaurantId);

    const [address, operatingHours, dishes] = await Promise.all([
      this.addressRepo.findOneByRestaurant(restaurantId),
      this.hoursRepo.findByRestaurant(restaurantId),
      this.dishRepo.findByRestaurant(restaurantId),
    ]);

    return this.restaurantPageDTOAssembler.build(
      restaurant,
      operatingHours,
      address,
      dishes,
    );
  }

  async getRestaurantNameAndLogo(
    restaurantId: string,
  ): Promise<GetRestaurantNameAndLogoDTO> {
    const { dba, logo } = await this.restaurantRepo.findOneById(restaurantId);
    return new GetRestaurantNameAndLogoDTO({
      restaurantName: dba,
      restaurantLogo: logo,
    });
  }

  async getMyBusinessInfo(ownerId: string): Promise<BusinessInfoDTO> {
    const restaurant = await this.restaurantRepo.findOneByOwner(ownerId);
    const restaurantId = restaurant.restaurantId;

    const [operatingHours, address] = await Promise.all([
      this.hoursRepo.findByRestaurant(restaurantId),
      this.addressRepo.findOneByRestaurant(restaurantId),
    ]);

    return this.assembler.build(restaurant, operatingHours, address);
  }
}
