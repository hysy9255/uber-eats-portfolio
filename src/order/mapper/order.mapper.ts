import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { CreateOrderData } from '../types/create-order-data';
import { SharedService } from 'src/shared/shared.service';
import { ReadOrderData } from '../types/read-order-data';
import { OrderDTO } from '../dto/order.dto';
import { UpdateOrderData } from '../types/update-order-data';

@Injectable()
export class OrderMapper {
  constructor(private readonly sharedService: SharedService) {}
  // static toOrmEntity(order: Order): OrderEntity {
  //   const orderEntity = new OrderEntity();
  //   orderEntity.orderId = order.orderId;
  //   orderEntity.status = order.status;
  //   orderEntity.clientId = order.clientId;
  //   orderEntity.restaurantId = order.restaurantId;
  //   orderEntity.driverId = order.driverId;
  //   return orderEntity;
  // }

  // static toDomain(rawOrder: RawOrder): Order {
  //   return new Order(
  //     rawOrder.orderId,
  //     rawOrder.status,
  //     rawOrder.clientId,
  //     rawOrder.restaurantId,
  //     rawOrder.driverId,
  //   );
  // }

  dtoToCreateData(
    clientId: string,
    totalPrice: number,
    dto: CreateOrderDTO,
  ): CreateOrderData {
    return new CreateOrderData({
      orderId: this.sharedService.generateId(),
      clientId,
      totalPrice,
      ...dto,
    });
  }

  readDataToDto(data: ReadOrderData): OrderDTO {
    return new OrderDTO({ ...data, createdAt: data.createdAt.toISOString() });
  }

  readToUpdateData(data: ReadOrderData): UpdateOrderData {
    return new UpdateOrderData({ ...data });
  }
}
