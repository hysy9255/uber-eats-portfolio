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
import { DishInternalModule } from 'src/dish/dish-internal.module';
import { ClientInternalModule } from 'src/client/module/client.internal.module';
import { DeliveryAddressSnapshotEntity } from './orm-entities/delivery-address-snapshot.orm.entity';
import { DeliveryAddressSnapshotRepository } from './repository/delivery-address-snapshot.repository';
import { DeliveryAddressSnapshotMapper } from './mapper/delivery-address-snapshot.mapper';
import { OrderGateway } from './order.gateway';
import { OrderValidationService } from './service/order.validation.service';
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
import { ClientOrderDetailMapper } from './mapper/client-order-detail.mapper';

const respositories = [
  OrderRepository,
  OrderStatsRepository,
  OrderItemRepository,
  DeliveryAddressSnapshotRepository,
];
const mappers = [
  OrderMapper,
  OrderItemMapper,
  DeliveryAddressSnapshotMapper,
  ClientOrderDetailMapper,
];
const entities = [OrderEntity, OrderItemEntity, DeliveryAddressSnapshotEntity];
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
  OrderDomainService,
  OrderValidationService,
];
const assemblers = [OrderOwnerDTOAssembler];

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    ClientInternalModule,
    OwnerModule,
    DishInternalModule,
  ],
  controllers,
  providers: [
    ...respositories,
    ...mappers,
    ...services,
    ...assemblers,
    OrderGateway,
  ],
})
export class OrderModule {}
