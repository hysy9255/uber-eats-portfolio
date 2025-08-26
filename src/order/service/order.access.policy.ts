import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOutput, UserRole } from 'src/user/dto/user-output';
import { ClientIdReader } from 'src/user/repository/reader/client.id.reader';
import { DriverIdReader } from 'src/user/repository/reader/driver.id.reader';
import { RestaurantIdReader } from 'src/user/repository/reader/restaurant.id.reader';
import { OrderEntity } from '../orm-entities/order.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderAccessPolicy {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly order: Repository<OrderEntity>,
    private readonly clients: ClientIdReader,
    private readonly drivers: DriverIdReader,
    private readonly restaurantIdReader: RestaurantIdReader,
  ) {}

  async ensureCanView(orderId: string, requester: UserOutput) {
    const a = await this.order
      .createQueryBuilder('o')
      .where('o.orderId = :orderId', { orderId })
      .select([
        'o.clientId AS "clientId"',
        'o.restaurantId AS "restaurantId"',
        'o.driverId AS "driverId"',
      ])
      .getRawOne<{
        clientId: string;
        restaurantId: string;
        driverId: string;
      }>();

    if (!a) throw new Error('Order not found');

    switch (requester.role) {
      case UserRole.Client: {
        const clientId = await this.clients.getClientIdByUserId(
          requester.userId,
        );
        if (!clientId || clientId !== a.clientId) throw new Error('error');
        break;
      }
      case UserRole.Owner: {
        const restaurantId =
          await this.restaurantIdReader.getRestaurantIdByOwnerUserId(
            requester.userId,
          );
        if (!restaurantId || restaurantId !== a.restaurantId)
          throw new Error('error');
        break;
      }
      case UserRole.Driver: {
        const driverId = await this.drivers.getDriverIdByUserId(
          requester.userId,
        );
        if (!driverId || a.driverId !== driverId) throw new Error('error');
        break;
      }
    }
  }
}
