import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/constants/orderStatus';
import { OrderForOwnerDTO } from '../../dto/response/order-for-owner.dto';
import { OwnerOrderDetailMapper } from '../../mapper/order-detail-owner.mapper';
import { OwnerOrderRepository } from 'src/order/repository/order.owner.repository';

@Injectable()
export class OwnerOrderQueryService {
  constructor(
    private readonly orderRepo: OwnerOrderRepository,
    private readonly mapper: OwnerOrderDetailMapper,
  ) {}

  async getOrders(
    ownerId: string,
    status?: OrderStatus,
  ): Promise<OrderForOwnerDTO[]> {
    const rows = await this.orderRepo.findByOwnerId(ownerId, status);

    if (rows.length === 0) {
      return [];
    }

    return this.mapper.toDTO(rows);
  }
}
