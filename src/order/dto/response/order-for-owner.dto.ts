import { ClientInfoDTO } from 'src/order/dto/response/client-info.dto';
import { DeliveryAddressSnapshotDTO } from './delivery-address-snapshot.dto';
import { OrderItemDTO } from './order-item.dto';
import { OrderDTO } from './order.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class DriverInfoDTO {
  @ApiProperty({
    example: 'Shawn Yoon',
    description: 'Driver name',
  })
  name: string;
}

export class OrderForOwnerDTO {
  @ApiProperty({ type: OrderDTO })
  orderInfo: OrderDTO;

  @ApiProperty({ type: [OrderItemDTO] })
  orderItems: OrderItemDTO[];

  @ApiProperty({ type: DeliveryAddressSnapshotDTO })
  deliveryAddressInfo: DeliveryAddressSnapshotDTO;

  @ApiProperty({ type: ClientInfoDTO })
  clientInfo: ClientInfoDTO;

  @ApiPropertyOptional({ type: DriverInfoDTO })
  driverInfo?: DriverInfoDTO;
}
