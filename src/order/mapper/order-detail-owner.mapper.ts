import { Injectable } from '@nestjs/common';
import { OrderForOwnerDTO } from '../dto/response/order-for-owner.dto';
import { OwnerOrderDetailRow } from '../types/owner-order-detail-row';
import { OrderDTO } from '../dto/response/order.dto';
import { DeliveryAddressSnapshotDTO } from '../dto/response/delivery-address-snapshot.dto';
import { ClientInfoDTO } from 'src/order/dto/response/client-info.dto';
import { OrderItemDTO } from '../dto/response/order-item.dto';

@Injectable()
export class OwnerOrderDetailMapper {
  toDTO(rows: OwnerOrderDetailRow[]): OrderForOwnerDTO[] {
    const orderMap = new Map<string, OrderForOwnerDTO>();

    for (const row of rows) {
      const existingOrder = orderMap.get(row.orderId);

      if (!existingOrder) {
        const dto = new OrderForOwnerDTO();
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
        dto.deliveryAddressInfo = new DeliveryAddressSnapshotDTO({
          streetAddress: row.streetAddress,
          apt: row.apt,
          city: row.city,
          state: row.state,
          zip: row.zip,
        });
        dto.clientInfo = new ClientInfoDTO({
          name: row.clientName,
          clientId: row.clientId,
          phoneNumber: row.phoneNumber,
        });

        dto.orderItems = [];
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
