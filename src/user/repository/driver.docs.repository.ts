import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDocsInput } from '../dto/user-input';
import { DriverDocsEntity } from '../orm-entities/driver.document.entity';

@Injectable()
export class DriverDocsRepository {
  constructor(
    @InjectRepository(DriverDocsEntity)
    private readonly driverDocsRepository: Repository<DriverDocsEntity>,
  ) {}

  async saveDriverDocs(
    documentId: string,
    driverId: string,
    createDriverDocsInput: CreateDriverDocsInput,
  ) {
    await this.driverDocsRepository.save(
      this.driverDocsRepository.create({
        ...createDriverDocsInput,
        driverId,
        documentId,
      }),
    );
  }
}
