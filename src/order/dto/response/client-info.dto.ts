import { ApiProperty } from '@nestjs/swagger';

export class ClientInfoDTO {
  @ApiProperty({
    example: 'client-uuid',
    description: 'Client ID',
  })
  clientId: string;

  @ApiProperty({
    example: 'Shawn Yoon',
    description: 'Client name',
  })
  name: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: 'Client phone number',
  })
  phoneNumber: string;

  constructor(init: { clientId: string; name: string; phoneNumber: string }) {
    this.clientId = init.clientId;
    this.name = init.name;
    this.phoneNumber = init.phoneNumber;
  }
}
