import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDTO {
  @ApiProperty({ example: 'car', description: 'Vehicle type' })
  vehicleType: string;

  @ApiProperty({ example: 'Toyota plus', description: 'Vehicle model' })
  model: string;

  @ApiProperty({ example: '2020', description: 'Year of vehicle' })
  year: string;

  @ApiProperty({ example: 'Black', description: 'Color of the vehicle' })
  color: string;

  @ApiProperty({ example: '7ABC123', description: 'License plate' })
  licensePlate: string;
}
