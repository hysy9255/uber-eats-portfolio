import { Injectable } from '@nestjs/common';
import { ClientOrderDetailRow } from '../types/client-order-detail-row';
import { GetOrderForClientDTO } from '../dto/get-order-for-client.dto';
import { OrderDTO } from '../dto/order.dto';
import { RestaurantInfoDTO } from 'src/restaurant/dto/restaurant-Info.dto';
import { DeliveryAddressSnapshotDTO } from '../dto/delivery-address-snapshot.dto';
import { OrderItemDTO } from '../dto/order-item.dto';

@Injectable()
export class ClientOrderDetailMapper {
  toDTO(rows: ClientOrderDetailRow[]): GetOrderForClientDTO[] {
    const orderMap = new Map<string, GetOrderForClientDTO>();

    for (const row of rows) {
      const existingOrder = orderMap.get(row.orderId);

      if (!existingOrder) {
        const dto = new GetOrderForClientDTO();

        dto.orderInfo = new OrderDTO({
          orderId: row.orderId,
          createdAt:
            row.createdAt instanceof Date
              ? row.createdAt.toISOString()
              : row.createdAt,
          totalPrice: Number(row.totalPrice),
          status: row.status,
          requestToRestaurant: row.requestToRestaurant,
        });

        dto.restaurantInfo = new RestaurantInfoDTO({
          dba: row.dba,
          eta: row.eta,
        });

        dto.deliveryAddressInfo = new DeliveryAddressSnapshotDTO({
          streetAddress: row.streetAddress,
          apt: row.apt,
          city: row.city,
          state: row.state,
          zip: row.zip,
        });

        dto.orderItems = [];

        orderMap.set(row.orderId, dto);
      }

      const orderDTO = orderMap.get(row.orderId)!;

      orderDTO.orderItems.push(
        new OrderItemDTO({
          dishImg: row.dishImg,
          name: row.name,
          quantity: Number(row.quantity),
          price: Number(row.price),
        }),
      );
    }

    return Array.from(orderMap.values());
  }
}
