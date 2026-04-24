import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatingHoursEntity } from '../orm-entities/operatingHours.entity';
import { Repository } from 'typeorm';
import { CreateOperatingHoursData } from '../types/create-operating-hours-data';
import { UpdateOperatingHoursData } from '../types/update-operating-hours-data';
import { ReadOperatingHoursData } from '../types/read-operating-hours-data';
import { DayOfWeek } from 'src/constants/dayOfWeek';

@Injectable()
export class OperatingHoursRepository {
  constructor(
    @InjectRepository(OperatingHoursEntity)
    private readonly repo: Repository<OperatingHoursEntity>,
  ) {}

  save(data: CreateOperatingHoursData[]) {
    return this.repo.save(this.repo.create(data));
  }

  // done
  update(data: UpdateOperatingHoursData[]) {
    return this.repo.save(this.repo.create(data));
  }

  findIdsAndDaysByRestaurantId(
    restaurantId: string,
  ): Promise<{ id: string; dayOfWeek: DayOfWeek }[]> {
    return this.repo
      .createQueryBuilder('op')
      .select(['op.id as id', 'op.dayOfWeek as "dayOfWeek"'])
      .where('op.restaurantId = :restaurantId', { restaurantId })
      .getRawMany<{ id: string; dayOfWeek: DayOfWeek }>();
  }

  findByRestaurantIds(
    restaurantIds: string[],
  ): Promise<ReadOperatingHoursData[]> {
    return this.repo
      .createQueryBuilder('op')
      .select([
        'op.id as id',
        'op.restaurantId as "restaurantId"',
        'op.dayOfWeek as "dayOfWeek"',
        'op.openTime as "openTime"',
        'op.closeTime as "closeTime"',
        'op.open24Hours as "open24Hours"',
        'op.closed as closed',
      ])
      .where('op.restaurantId IN (:...restaurantIds)', { restaurantIds })
      .getRawMany<ReadOperatingHoursData>();
  }

  findByRestaurantId(restaurantId: string): Promise<ReadOperatingHoursData[]> {
    return this.repo
      .createQueryBuilder('op')
      .select([
        'op.id as id',
        'op.restaurantId as "restaurantId"',
        'op.dayOfWeek as "dayOfWeek"',
        'op.openTime as "openTime"',
        'op.closeTime as "closeTime"',
        'op.open24Hours as "open24Hours"',
        'op.closed as closed',
      ])
      .where('op.restaurantId = :restaurantId', { restaurantId })
      .getRawMany<ReadOperatingHoursData>();
  }
}
