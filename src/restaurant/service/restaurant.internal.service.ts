import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { RestaurantMapper } from '../mapper/restaurant.mapper';
import { ReadRestaurantData } from '../types/read-restaurant-data';
import { OperatingHoursRepository } from '../repository/operating-hours.repository';
import { OperatingHoursMapper } from '../mapper/operating-hours.mapper';
import { RestaurantAddressRepository } from '../repository/restaurant-address.repository';
import { RestaurantAddressMapper } from '../mapper/restaurant-address.mapper';
import { CreateRestaurantSummaryDTO } from '../dto/create-restaurant-summary.dto';

@Injectable()
export class RestaurantInternalService {
  constructor(
    private readonly restaurantRepo: RestaurantRepository,
    private readonly operatingHoursRepo: OperatingHoursRepository,
    private readonly restaurantAddressRepo: RestaurantAddressRepository,
    private readonly restaruantMapper: RestaurantMapper,
    private readonly operatingHoursMapper: OperatingHoursMapper,
    private readonly restaurantAddressMapper: RestaurantAddressMapper,
  ) {}

  // done
  async getById(restaurantId: string): Promise<ReadRestaurantData> {
    return await this.restaurantRepo.findOneById(restaurantId);
  }

  async getByOrderId(orderId: string): Promise<ReadRestaurantData> {
    return await this.restaurantRepo.findOneByOrderId(orderId);
  }

  async getByOrderIds(
    orderIds: string[],
  ): Promise<(ReadRestaurantData & { orderId: string })[]> {
    return await this.restaurantRepo.findAllByOrderIds(orderIds);
  }

  async getByOrders(
    orderIds: string[],
  ): Promise<(ReadRestaurantData & { orderId: string })[]> {
    return await this.restaurantRepo.findAllByOrderIds(orderIds);
  }

  // done
  async getByOwnerId(ownerId: string): Promise<ReadRestaurantData> {
    return await this.restaurantRepo.findOneByOwnerId(ownerId);
  }

  async getByOwner(ownerId: string): Promise<ReadRestaurantData> {
    return await this.restaurantRepo.findOneByOwnerId(ownerId);
  }

  async getIdByOwner(ownerId: string): Promise<{ restaurantId: string }> {
    const { restaurantId } =
      await this.restaurantRepo.findOneByOwnerId(ownerId);
    return { restaurantId };
  }

  // done
  async create(
    ownerId: string,
    dto: CreateRestaurantSummaryDTO,
  ): Promise<{ restaurantId: string }> {
    const { generalInfo, operatingHours, address } = dto;
    const createRestaurantData = this.restaruantMapper.dtoToCreateData(
      ownerId,
      generalInfo,
    );
    const { restaurantId } = createRestaurantData;
    const cohData = this.operatingHoursMapper.dtoToCreateData(
      restaurantId,
      operatingHours,
    );
    const createAddressData = this.restaurantAddressMapper.dtoToCreateData(
      restaurantId,
      address,
    );

    await this.restaurantRepo.save(createRestaurantData);
    await this.operatingHoursRepo.save(cohData);
    await this.restaurantAddressRepo.save(createAddressData);
    return { restaurantId };
  }

  // async getOperatingHoursByRestaurantId(restaurantId: string) {
  //   return await this.operatingHoursRepo.findByRestaurantId(restaurantId);
  // }

  isRestaurantOpen(restaurantId: string): boolean {
    return true;
  }
}
