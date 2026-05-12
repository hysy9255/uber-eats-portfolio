import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDriverDocsDTO {
  @ApiProperty({ example: 'license img', description: 'license' })
  @IsString()
  license: string;

  @ApiProperty({ example: 'insurance img', description: 'insurance' })
  @IsString()
  insurance: string;

  @ApiProperty({ example: '', description: 'Additional notes about documents' })
  @IsString()
  additionalNotes: string;
}
