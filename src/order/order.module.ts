import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orm-entities/order.orm.entity';
import { OrderExternalService } from './service/order.external.service';
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
  controllers: [OrderController],
  providers: [
    OrderExternalService,
    OrderRepository,
    OrderItemRepository,
    DeliveryAddressSnapshotRepository,
    OrderMapper,
    OrderItemMapper,
    DeliveryAddressSnapshotMapper,
    OrderDomainService,
    OrderGateway,
  ],
})
export class OrderModule {}
