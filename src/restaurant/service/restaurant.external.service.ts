import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { GetRestaurantPageViewDTO } from '../dto/get-restaurant-page-view.dto';
import { DishInternalService } from 'src/dish/dish.internal.service';
import { OwnerInternalService } from 'src/owner/owner.internal.service';
import { RestaurantMapper } from '../mapper/restaurant.mapper';
import { UpdateRestaurantDTO } from '../dto/update-restaurant.dto';
import { GetRestaurantNameAndLogoDTO } from '../dto/get-restaurant-name.dto';
import { ReadOperatingHoursData } from '../types/read-operating-hours-data';
import { OperatingHoursRepository } from '../repository/operating-hours.repository';
import { OperatingHoursMapper } from '../mapper/operating-hours.mapper';
import { GetRestaurantsPageViewDTO } from '../dto/get-restaurants-page-view.dto';
import { RestaurantAddressRepository } from '../repository/restaurant-address.repository';
import { RestaurantAddressMapper } from '../mapper/restaurant-address.mapper';
import { GetMyRestaurantForOwnerDashboardDTO } from '../dto/get-my-restaurant-for-owner-dashboard.dto';

@Injectable()
export class RestaurantExternalService {
  constructor(
    private readonly restaurantRepo: RestaurantRepository,
    private readonly operatingHoursRepo: OperatingHoursRepository,
    private readonly restaurantAddressRepo: RestaurantAddressRepository,
    private readonly restaurantMapper: RestaurantMapper,
    private readonly restaurantAddressMapper: RestaurantAddressMapper,
    private readonly operatingHoursMapper: OperatingHoursMapper,
    private readonly dishInternalService: DishInternalService,
    private readonly ownerInternalService: OwnerInternalService,
  ) {}

  // done
  async getRestaurantsPageView(): Promise<GetRestaurantsPageViewDTO> {
    const restaurants = await this.restaurantRepo.findAll();
    const restaurantIds = restaurants.map((r) => r.restaurantId);
    const addresses =
      await this.restaurantAddressRepo.findAllByRestaurantIds(restaurantIds);
    const operatingHours =
      await this.operatingHoursRepo.findByRestaurantIds(restaurantIds);

    const hoursMap = new Map<string, ReadOperatingHoursData[]>();

    for (const h of operatingHours) {
      const list = hoursMap.get(h.restaurantId);
      if (list) {
        list.push(h);
      } else {
        hoursMap.set(h.restaurantId, [h]);
      }
    }

    const response = new GetRestaurantsPageViewDTO();
    response.restaurantSummaries = [];

    for (const id of restaurantIds) {
      const restaurant = restaurants.find((r) => r.restaurantId === id);
      const address = addresses.find((a) => a.restaurantId === id);
      const operatingHours = hoursMap.get(id);

      response.restaurantSummaries.push({
        generalInfo: this.restaurantMapper.readDataToDTO(restaurant!),
        address: this.restaurantAddressMapper.readDataToDTO(address!),
        operatingHours: this.operatingHoursMapper.readDataToDTO(
          operatingHours!,
        ),
      });
    }
    return response;
  }

  // done
  async getRestaurantPageViewByRestaurantId(
    restaurantId: string,
  ): Promise<GetRestaurantPageViewDTO> {
    const restaurant = await this.restaurantRepo.findOneById(restaurantId);
    const address =
      await this.restaurantAddressRepo.findOneByRestaurantId(restaurantId);
    const operatingHours =
      await this.operatingHoursRepo.findByRestaurantId(restaurantId);
    const dishes =
      await this.dishInternalService.getAllByRestaurantId(restaurantId);

    const response = new GetRestaurantPageViewDTO();
    response.restaurantSummary = {
      generalInfo: this.restaurantMapper.readDataToDTO(restaurant),
      address: this.restaurantAddressMapper.readDataToDTO(address),
      operatingHours: this.operatingHoursMapper.readDataToDTO(operatingHours),
    };
    response.dishes = dishes;
    return response;
  }

  // done
  async getRestaurantNameAndLogo(
    restaurantId: string,
  ): Promise<GetRestaurantNameAndLogoDTO> {
    const { dba, logo } = await this.restaurantRepo.findOneById(restaurantId);
    return new GetRestaurantNameAndLogoDTO({
      restaurantName: dba,
      restaurantLogo: logo,
    });
  }

  // done
  async getOwnerRestaurantByUserId(
    userId: string,
  ): Promise<GetMyRestaurantForOwnerDashboardDTO> {
    const { ownerId } =
      await this.ownerInternalService.getOwnerIdByUserId(userId);
    const restaurant = await this.restaurantRepo.findOneByOwnerId(ownerId);
    const restaurantId = restaurant.restaurantId;
    const operatingHours =
      await this.operatingHoursRepo.findByRestaurantId(restaurantId);
    const address =
      await this.restaurantAddressRepo.findOneByRestaurantId(restaurantId);

    const response = new GetMyRestaurantForOwnerDashboardDTO();
    response.restaurantSummary = {
      generalInfo: this.restaurantMapper.readDataToDTO(restaurant),
      operatingHours: this.operatingHoursMapper.readDataToDTO(operatingHours),
      address: this.restaurantAddressMapper.readDataToDTO(address),
    };
    return response;
  }

  // done
  async updateRestaurant(userId: string, dto: UpdateRestaurantDTO) {
    const { ownerId } =
      await this.ownerInternalService.getOwnerIdByUserId(userId);

    const { restaurantId } =
      await this.restaurantRepo.findOneByOwnerId(ownerId);

    if (dto.generalInfo) {
      const updateRestaurantInfoData = this.restaurantMapper.dtoToUpdateData(
        restaurantId,
        dto.generalInfo,
      );
      await this.restaurantRepo.update(updateRestaurantInfoData);
    }

    if (dto.operatingHours) {
      const operatingHoursIdsAndDays =
        await this.operatingHoursRepo.findIdsAndDaysByRestaurantId(
          restaurantId,
        );
      const updateOperatingHoursData =
        this.operatingHoursMapper.dtoToUpdateData(
          restaurantId,
          operatingHoursIdsAndDays,
          dto.operatingHours,
        );
      await this.operatingHoursRepo.update(updateOperatingHoursData);
    }

    if (dto.address) {
      const { restaurantAddressId } =
        await this.restaurantAddressRepo.findIdByRestaurantId(restaurantId);
      const updateAddressData = this.restaurantAddressMapper.dtoToUpdateData(
        restaurantId,
        restaurantAddressId,
        dto.address,
      );
      await this.restaurantAddressRepo.update(updateAddressData);
    }
  }
}
