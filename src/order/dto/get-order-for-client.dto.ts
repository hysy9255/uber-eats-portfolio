import { RestaurantInfoDTO } from 'src/restaurant/dto/restaurant-Info.dto';
import { OrderItemDTO } from './order-item.dto';
import { OrderDTO } from './order.dto';
import { DeliveryAddressSnapshotDTO } from './delivery-address-snapshot.dto';

export class GetOrderForClientDTO {
  orderInfo: OrderDTO;
  orderItems: OrderItemDTO[];
  restaurantInfo: RestaurantInfoDTO;
  deliveryAddressInfo?: DeliveryAddressSnapshotDTO;
}
