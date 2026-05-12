import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { DishEntity } from '../orm-entity/dish.orm.entity';
import { CreateDishData } from '../types/create-dish-data';
import { UpdateDishData } from '../types/update-dish-data';
import { ReadDishData } from '../types/read-dish-data';
import { ReadDishDataSchema } from '../schema/read-dish-data.schema';

@Injectable()
export class DishRepository {
  constructor(
    @InjectRepository(DishEntity)
    private readonly repo: Repository<DishEntity>,
  ) {}

  async save(data: CreateDishData | CreateDishData[]) {
    try {
      if (Array.isArray(data)) {
        const entities = this.repo.create(data);
        await this.repo.save(entities);
        return;
      }

      const entity = this.repo.create(data);
      await this.repo.save(entity);
    } catch (e) {
      console.error('Error saving dish:', e);
      throw new InternalServerErrorException('Failed to save dish information');
    }
  }

  async update(data: UpdateDishData) {
    try {
      await this.repo.save(this.repo.create(data));
    } catch (e) {
      console.error('Error updating dish:', e);
      throw new InternalServerErrorException(
        'Failed to update dish information',
      );
    }
  }

  async delete(id: string) {
    try {
      await this.repo.delete({ dishId: id });
    } catch (e) {
      console.error('Error deleting dish:', e);
      throw new InternalServerErrorException(
        'Failed to delete dish information',
      );
    }
  }

  async findByRestaurant(restaurantId: string): Promise<ReadDishData[]> {
    try {
      return await this.baseReadQb()
        .where('d.restaurantId = :restaurantId', {
          restaurantId,
        })
        .getRawMany<ReadDishData>();
    } catch (e) {
      console.error('Error finding dishes by restaurant:', e);
      throw new InternalServerErrorException(
        'Failed to find dishes by restaurant',
      );
    }
  }

  async findOneById(id: string): Promise<ReadDishData> {
    const row = await this.baseReadQb()
      .where('d.dishId = :dishId', { dishId: id })
      .getRawOne<ReadDishData>();

    if (!row) {
      throw new Error('Order Not Found');
    }

    return this.parseOne(row);
  }

  async findByIds(dishIds: string[]): Promise<ReadDishData[]> {
    const qb = this.baseReadQb().where('d.dishId IN (:...dishIds)', {
      dishIds,
    });

    const rows = await qb.getRawMany<ReadDishData>();
    return this.parseMany(rows);
  }

  private baseReadQb(): SelectQueryBuilder<DishEntity> {
    return this.repo
      .createQueryBuilder('d')
      .select([
        'd.dishId AS "dishId"',
        'd.restaurantId AS "restaurantId"',
        'd.name AS name',
        'd.price AS price',
        'd.description AS description',
        'd.category AS category',
        'd.dishImgUrl AS "dishImgUrl"',
      ]);
  }

  private parseOne(row: unknown): ReadDishData {
    const parsed = ReadDishDataSchema.safeParse(row);

    if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new InternalServerErrorException('Invalid dish read model');
    }

    return parsed.data;
  }

  private parseMany(rows: unknown[]): ReadDishData[] {
    const parsed = ReadDishDataSchema.array().safeParse(rows);

    if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new InternalServerErrorException('Invalid dish read model');
    }

    return parsed.data;
  }
}
