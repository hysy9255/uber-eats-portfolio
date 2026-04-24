import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateOrderItemData } from '../types/create-order-item-data';
import { OrderItemDTO } from '../dto/order-item.dto';
import { ReadOrderItemData } from '../types/read-order-item-data';
import { OrderItem } from '../dto/create-order.dto';

@Injectable()
export class OrderItemMapper {
  constructor(private readonly sharedService: SharedService) {}

  dtoToCreateData(orderId: string, dtos: OrderItem[]): CreateOrderItemData[] {
    return dtos.map((dto) => {
      return new CreateOrderItemData({
        orderItemId: this.sharedService.generateId(),
        orderId,
        ...dto,
      });
    });
  }

  readDataToDto(data: ReadOrderItemData[]): OrderItemDTO[] {
    return data.map((d) => {
      return new OrderItemDTO({
        ...d,
      });
    });
  }
}
