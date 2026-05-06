import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from 'src/constants/orderStatus';
import { OrderForClientDTO } from 'src/order/dto/response/order-for-client.dto';
import { ClientOrderDetailMapper } from 'src/order/mapper/order-detail-client.mapper';
import { ClientOrderRepository } from 'src/order/repository/order.client.respository';

@Injectable()
export class ClientOrderQueryService {
  constructor(
    private readonly orderRepo: ClientOrderRepository,
    private readonly clientOrderDetailMapper: ClientOrderDetailMapper,
  ) {}

  async getOrders(
    clientId: string,
    statuses?: OrderStatus[],
  ): Promise<OrderForClientDTO[]> {
    const rows = await this.orderRepo.findByClientId(clientId, statuses);

    if (rows.length === 0) {
      throw new NotFoundException('Orders do not exist');
    }

    return this.clientOrderDetailMapper.toDTO(rows);
  }

  async getOrder(
    clientId: string,
    orderId: string,
  ): Promise<OrderForClientDTO> {
    const rows = await this.orderRepo.findByIdAndClientId(orderId, clientId);

    if (rows.length === 0) {
      throw new NotFoundException('Order do not exist');
    }

    return this.clientOrderDetailMapper.toDTO(rows)[0];
  }
}
