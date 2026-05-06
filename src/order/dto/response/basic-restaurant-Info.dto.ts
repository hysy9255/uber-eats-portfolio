import { ApiProperty } from '@nestjs/swagger';

export class BasicRestaurantInfoDTO {
  @ApiProperty({ example: 'Chinese Tuxedo', description: 'Restaurant Name' })
  readonly dba: string;

  @ApiProperty({ example: '10 mins', description: 'Estimated Time of Arrival' })
  readonly eta: string;

  constructor(init: { dba: string; eta: string }) {
    this.dba = init.dba;
    this.eta = init.eta;
  }
}
