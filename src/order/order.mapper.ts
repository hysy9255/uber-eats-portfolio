import { Order } from './domain/order';
import { OrderEntity } from './orm-entities/order.orm.entity';
import { RawOrder } from './service/order.domain.service';

export class OrderMapper {
  static toOrmEntity(order: Order): OrderEntity {
    const orderEntity = new OrderEntity();
    orderEntity.orderId = order.orderId;
    orderEntity.status = order.status;
    orderEntity.clientId = order.clientId;
    orderEntity.restaurantId = order.restaurantId;
    orderEntity.driverId = order.driverId;
    return orderEntity;
  }

  static toDomain(rawOrder: RawOrder): Order {
    return new Order(
      rawOrder.orderId,
      rawOrder.status,
      rawOrder.clientId,
      rawOrder.restaurantId,
      rawOrder.driverId,
    );
  }
}
