import { Module } from '@nestjs/common';
import { OrderMapper } from './mapper/order.mapper';
import { OrderItemMapper } from './mapper/order-item.mapper';
import { DeliveryAddressSnapshotMapper } from './mapper/delivery-address-snapshot.mapper';
import { OrderGateway } from './order.gateway';
import { OrderValidationService } from './service/internal/order.validation.service';
import { OwnerOrderController } from './controller/order.role.owner.controller';
import { ClientOrderController } from './controller/order.role.client.controller';
import { ClientOrderCommandService } from './service/client/client.order.command.service';
import { OwnerOrderCommandService } from './service/owner/owner.order.command.service';
import { OwnerOrderQueryService } from './service/owner/owner.order.query.service';
import { OrderKpiService } from './service/order.kpi.service';
import { ClientOrderDetailMapper } from './mapper/order-detail-client.mapper';
import { OrderKpiController } from './controller/order.\bkpi.controller';
import { ClientOrderQueryService } from './service/client/client.order.query.service';
import { OrderPriceCalculator } from './service/internal/order-price.calculator';
import { OwnerOrderDetailMapper } from './mapper/order-detail-owner.mapper';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { DishModule } from 'src/dish/dish.module';
import { ClientModule } from 'src/client/client.module';

const mappers = [
  OrderMapper,
  OrderItemMapper,
  DeliveryAddressSnapshotMapper,
  ClientOrderDetailMapper,
  OwnerOrderDetailMapper,
];
const controllers = [
  OwnerOrderController,
  ClientOrderController,
  OrderKpiController,
];
const services = [
  ClientOrderCommandService,
  ClientOrderQueryService,
  OwnerOrderCommandService,
  OwnerOrderQueryService,
  OrderKpiService,
  OrderValidationService,
  OrderPriceCalculator,
];

@Module({
  imports: [ClientModule, RestaurantModule, DishModule],
  controllers,
  providers: [...mappers, ...services, OrderGateway],
})
export class OrderModule {}
