import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { OrderStatus } from 'src/constants/orderStatus';
import { GetOrderForClientDTO } from '../dto/get-order-for-client.dto';
import { ClientOrderDetailMapper } from '../mapper/client-order-detail.mapper';

@Injectable()
export class ClientOrderQueryService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly clientOrderDetailMapper: ClientOrderDetailMapper,
  ) {}

  async getOrdersByClient(
    clientId: string,
    statuses?: OrderStatus[],
  ): Promise<GetOrderForClientDTO[]> {
    const rows = await this.orderRepo.findByClientId(clientId, statuses);

    if (rows.length === 0) {
      throw new NotFoundException('Orders do not exist');
    }

    return this.clientOrderDetailMapper.toDTO(rows);
  }

  async getOrderByIdAndClientId(
    clientId: string,
    orderId: string,
  ): Promise<GetOrderForClientDTO[]> {
    const rows = await this.orderRepo.findByIdAndClientId(orderId, clientId);

    if (rows.length === 0) {
      throw new NotFoundException('Order do not exist');
    }

    return this.clientOrderDetailMapper.toDTO(rows);
  }
}
