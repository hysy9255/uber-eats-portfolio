import { BasicRestaurantInfoDTO } from 'src/order/dto/response/basic-restaurant-Info.dto';
import { OrderItemDTO } from './order-item.dto';
import { OrderDTO } from './order.dto';
import { DeliveryAddressSnapshotDTO } from './delivery-address-snapshot.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderForClientDTO {
  @ApiProperty({ type: OrderDTO })
  orderInfo: OrderDTO;

  @ApiProperty({ type: [OrderItemDTO] })
  orderItems: OrderItemDTO[];

  @ApiProperty({ type: BasicRestaurantInfoDTO })
  restaurantInfo: BasicRestaurantInfoDTO;

  @ApiProperty({ type: DeliveryAddressSnapshotDTO })
  deliveryAddressInfo: DeliveryAddressSnapshotDTO;
}
