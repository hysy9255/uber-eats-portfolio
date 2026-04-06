import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDocsDTO {
  @ApiProperty({ example: 'license img', description: 'license' })
  license: string;

  @ApiProperty({ example: 'insurance img', description: 'insurance' })
  insurance: string;

  @ApiProperty({ example: '', description: 'Additional notes about documents' })
  additionalNotes: string;
}
