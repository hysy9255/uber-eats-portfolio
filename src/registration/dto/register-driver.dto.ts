import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateDriverDocsDTO } from 'src/driver/dto/creat-driver-docs.input.dto';
import { CreateVehicleDTO } from 'src/driver/dto/create-vehicle.input.dto';
import { CreateUserDTO } from 'src/user/dto/request/create-user.dto';

export class RegisterDriverDTO {
  @ApiProperty({ type: CreateUserDTO })
  @ValidateNested({ each: true })
  @Type(() => CreateUserDTO)
  user: CreateUserDTO;

  @ApiProperty({ type: CreateVehicleDTO })
  @ValidateNested({ each: true })
  @Type(() => CreateVehicleDTO)
  vehicle: CreateVehicleDTO;

  @ApiProperty({ type: CreateDriverDocsDTO })
  @ValidateNested({ each: true })
  @Type(() => CreateDriverDocsDTO)
  driverDocuments: CreateDriverDocsDTO;
}
