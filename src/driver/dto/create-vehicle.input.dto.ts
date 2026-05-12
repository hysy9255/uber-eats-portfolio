import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVehicleDTO {
  @ApiProperty({ example: 'car', description: 'Vehicle type' })
  @IsString()
  vehicleType: string;

  @ApiProperty({ example: 'Toyota plus', description: 'Vehicle model' })
  @IsString()
  model: string;

  @ApiProperty({ example: '2020', description: 'Year of vehicle' })
  @IsString()
  year: string;

  @ApiProperty({ example: 'Black', description: 'Color of the vehicle' })
  @IsString()
  color: string;

  @ApiProperty({ example: '7ABC123', description: 'License plate' })
  @IsString()
  licensePlate: string;
}
