import { Injectable } from '@nestjs/common';
import { ReadOrderData } from '../types/read-order-data';
import { ReadOrderItemData } from '../types/read-order-item-data';
import { ReadDeliveryAddressSnapshotData } from '../types/read-delivery-address-snapshot-data';
import { ClientInfoDTO } from 'src/client/dto/client-info.dto';
import { GetOrderForOwnerDTO } from '../dto/get-order-for-owner.dto';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderItemMapper } from '../mapper/order-item.mapper';
import { DeliveryAddressSnapshotMapper } from '../mapper/delivery-address-snapshot.mapper';

@Injectable()
export class OrderOwnerDTOAssembler {
  constructor(
    private readonly orderMapper: OrderMapper,
    private readonly orderItemMapper: OrderItemMapper,
    private readonly deliveryAddressSnapshotMapper: DeliveryAddressSnapshotMapper,
  ) {}

  build(
    orders: ReadOrderData[],
    orderItems: ReadOrderItemData[],
    snapshots: ReadDeliveryAddressSnapshotData[],
    clientInfos: ClientInfoDTO[],
  ): GetOrderForOwnerDTO[] {
    const orderItemsMap = new Map<string, typeof orderItems>();
    for (const item of orderItems) {
      const existing = orderItemsMap.get(item.orderId) ?? [];
      existing.push(item);
      orderItemsMap.set(item.orderId, existing);
    }

    const snapshotMap = new Map(
      snapshots.map((snapshot) => [snapshot.orderId, snapshot]),
    );

    const clientInfoMap = new Map(
      clientInfos.map((client) => [client.clientId, client]),
    );

    return orders.map((order) => {
      const response = new GetOrderForOwnerDTO();
      response.orderInfo = this.orderMapper.readDataToDto(order);

      const ois = orderItemsMap.get(order.orderId) ?? [];
      response.orderItems = this.orderItemMapper.readDataToDto(ois);

      const dass = snapshotMap.get(order.orderId);
      if (!dass) throw new Error('Delivery Address Snapshot Not Found');
      response.deliveryAddressInfo =
        this.deliveryAddressSnapshotMapper.readDataToDTO(dass);

      const clientInfo = clientInfoMap.get(order.clientId);
      if (!clientInfo) throw new Error('ClientInfo Not Found');
      response.clientInfo = clientInfo;

      return response;
    });
  }
}
