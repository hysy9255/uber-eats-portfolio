import { Module } from '@nestjs/common';
import { OwnerInternalService } from './owner.internal.service';
import { OwnerRepository } from './owner.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerEntity } from './owner.orm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerEntity])],
  providers: [OwnerInternalService, OwnerRepository],
  exports: [OwnerInternalService],
})
export class OwnerModule {}
