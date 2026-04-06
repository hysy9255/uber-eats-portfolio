import { ClientInfoDTO } from 'src/client/dto/client-info.dto';
import { DeliveryAddressSnapshotDTO } from './delivery-address-snapshot.dto';
import { OrderItemDTO } from './order-item.dto';
import { OrderDTO } from './order.dto';

class DriverInfoDTO {
  name: string;
}

export class GetOrderForOwnerDTO {
  orderInfo: OrderDTO;
  orderItems: OrderItemDTO[];
  deliveryAddressInfo: DeliveryAddressSnapshotDTO;
  clientInfo: ClientInfoDTO;
  driverInfo?: DriverInfoDTO;
}
