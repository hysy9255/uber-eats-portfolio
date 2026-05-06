import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateDayHoursDTO {
  @ApiPropertyOptional({ example: '09:00' })
  @IsOptional()
  @IsString()
  readonly open?: string;

  @ApiPropertyOptional({ example: '21:00' })
  @IsOptional()
  @IsString()
  readonly close?: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly open24: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly closed: boolean;
}
