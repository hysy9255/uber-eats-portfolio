import { ApiProperty } from '@nestjs/swagger';
import { CreateDriverDocsDTO } from 'src/driver/dto/creat-driver-docs.input.dto';
import { CreateVehicleDTO } from 'src/driver/dto/create-vehicle.input.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

export class RegisterDriverDTO {
  @ApiProperty({ type: CreateUserDTO })
  user: CreateUserDTO;

  @ApiProperty({ type: CreateVehicleDTO })
  vehicle: CreateVehicleDTO;

  @ApiProperty({ type: CreateDriverDocsDTO })
  driverDocuments: CreateDriverDocsDTO;
}
