import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import { TransactionType } from '../entities/Transaction';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetTransactionsQueryDTO {
  @ApiProperty({ example: 7, minimum: 1, maximum: 12 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({ example: 2025 })
  @Type(() => Number)
  @IsNumber()
  @Min(2025)
  year: number;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  bankAccountId?: string;

  @ApiPropertyOptional({ enum: TransactionType, enumName: 'TransactionType' })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;
}
