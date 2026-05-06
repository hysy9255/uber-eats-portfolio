import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/orm-entity/client.orm.entity';
import { DeliveryAddressEntity } from 'src/client/orm-entity/delivery-address.orm.entity';
import { ClientRepository } from 'src/client/repository/client.repository';
import { DeliveryAddressRepository } from 'src/client/repository/delivery-address.repository';
import { DishEntity } from 'src/dish/orm-entity/dish.orm.entity';
import { DriverDocsEntity } from 'src/driver/orm-entity/driver.document.entity';
import { DriverEntity } from 'src/driver/orm-entity/driver.orm.entity';
import { VehicleEntity } from 'src/driver/orm-entity/vehicle.orm.entity';
import { DriverRepository } from 'src/driver/repository/driver.repository';
import { DeliveryAddressSnapshotEntity } from 'src/order/orm-entity/delivery-address-snapshot.orm.entity';
import { OrderItemEntity } from 'src/order/orm-entity/order-item.orm.entity';
import { OrderEntity } from 'src/order/orm-entity/order.orm.entity';
import { OrderRepository } from 'src/order/repository/order.repository';
import { OwnerRepository } from 'src/owner/repository/owner.repository';
import { OperatingHoursEntity } from 'src/restaurant/orm-entity/operatingHours.entity';
import { RestaurantAddressEntity } from 'src/restaurant/orm-entity/restaurantAddress.entity';
import { RestaurantEntity } from 'src/restaurant/orm-entity/restaurants.orm.entity';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserEntity } from 'src/user/orm-entity/user.orm.entity';
import { OwnerEntity } from 'src/owner/orm-entity/owner.orm.entity';
import { OrderStatsRepository } from 'src/order/repository/order.stats.repository';
import { OrderItemRepository } from 'src/order/repository/orderItem.repository';
import { DeliveryAddressSnapshotRepository } from 'src/order/repository/delivery-address-snapshot.repository';
import { DishRepository } from 'src/dish/repository/dish.repository';
import { ClientOrderRepository } from 'src/order/repository/order.client.respository';
import { OwnerOrderRepository } from 'src/order/repository/order.owner.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OwnerEntity,
      DriverEntity,
      ClientEntity,
      DeliveryAddressEntity,
      DeliveryAddressSnapshotEntity,
      RestaurantEntity,
      RestaurantAddressEntity,
      OperatingHoursEntity,
      OrderEntity,
      OrderItemEntity,
      DeliveryAddressSnapshotEntity,
      DishEntity,
      OrderItemEntity,
      VehicleEntity,
      DriverDocsEntity,
    ]),
  ],
  providers: [
    UserRepository,
    ClientRepository,
    OwnerRepository,
    DriverRepository,
    DeliveryAddressRepository,
    RestaurantRepository,
    DishRepository,
    OrderRepository,
    ClientOrderRepository,
    OwnerOrderRepository,
    DriverRepository,
    OrderStatsRepository,
    OrderItemRepository,
    DeliveryAddressSnapshotRepository,
  ],
  exports: [
    UserRepository,
    ClientRepository,
    OwnerRepository,
    DriverRepository,
    DeliveryAddressRepository,
    RestaurantRepository,
    DishRepository,
    OrderRepository,
    ClientOrderRepository,
    OwnerOrderRepository,
    DriverRepository,
    OrderStatsRepository,
    OrderItemRepository,
    DeliveryAddressSnapshotRepository,
  ],
})
export class PersistenceModule {}
