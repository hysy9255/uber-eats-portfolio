import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orm-entities/order.orm.entity';
import { OrderRepository } from './repository/order.repository';
import { OrderMapper } from './mapper/order.mapper';
import { OrderDomainService } from './service/order.domain.service';
import { OrderItemMapper } from './mapper/order-item.mapper';
import { OrderItemEntity } from './orm-entities/order-item.orm.entity';
import { OrderItemRepository } from './repository/orderItem.repository';
import { OwnerModule } from 'src/owner/owner.module';
import { RestaurantInternalModule } from 'src/restaurant/restaurant-internal.module';
import { DishInternalModule } from 'src/dish/dish-internal.module';
import { ClientInternalModule } from 'src/client/module/client.internal.module';
import { DeliveryAddressSnapshotEntity } from './orm-entities/delivery-address-snapshot.orm.entity';
import { DeliveryAddressSnapshotRepository } from './repository/delivery-address-snapshot.repository';
import { DeliveryAddressSnapshotMapper } from './mapper/delivery-address-snapshot.mapper';
import { OrderGateway } from './order.gateway';
// import { OrderCommandService } from './service/order.command.service';
// import { OrderQueryService } from './service/order.query.service';
import { OrderValidationService } from './service/order.validation.service';
import { OrderClientDTOAssembler } from './assembler/order-client-dto.assembler';
import { OrderOwnerDTOAssembler } from './assembler/order-owner-dto.assembler';
import { OwnerOrderController } from './controller/owner.order.controller';
import { ClientOrderController } from './controller/client.order.controller';
import { ClientOrderCommandService } from './service/client.order.command.service';
import { OwnerOrderCommandService } from './service/owner.order.command.service';
import { ClientOrderQueryService } from './service/client.order.query.service';
import { OwnerOrderQueryService } from './service/owner.order.query.service';
import { OrderKpiService } from './service/order.kpi.service';
import { OrderKpiController } from './controller/\bkpi.controller';
import { OrderStatsRepository } from './repository/order.stats.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      DeliveryAddressSnapshotEntity,
    ]),
    ClientInternalModule,
    OwnerModule,
    RestaurantInternalModule,
    DishInternalModule,
  ],
  controllers: [
    OwnerOrderController,
    ClientOrderController,
    OrderKpiController,
  ],
  providers: [
    OrderRepository,
    OrderStatsRepository,
    OrderItemRepository,
    DeliveryAddressSnapshotRepository,
    OrderMapper,
    OrderItemMapper,
    DeliveryAddressSnapshotMapper,
    OrderDomainService,
    OrderGateway,
    OrderValidationService,
    OrderClientDTOAssembler,
    OrderOwnerDTOAssembler,
    ClientOrderCommandService,
    ClientOrderQueryService,
    OwnerOrderCommandService,
    OwnerOrderQueryService,
    OrderKpiService,
  ],
})
export class OrderModule {}
