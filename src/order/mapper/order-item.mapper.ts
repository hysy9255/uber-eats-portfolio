import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateOrderItemData } from '../types/create-order-item-data';
import { CreateOrderItemDTO } from '../dto/request/create-order-item.dto';

@Injectable()
export class OrderItemMapper {
  constructor(private readonly sharedService: SharedService) {}

  dtoToCreateData(
    orderId: string,
    dtos: CreateOrderItemDTO[],
  ): CreateOrderItemData[] {
    return dtos.map((dto) => {
      return new CreateOrderItemData({
        orderItemId: this.sharedService.generateId(),
        orderId,
        ...dto,
      });
    });
  }
}
