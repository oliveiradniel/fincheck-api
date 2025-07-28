import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import { TransactionType } from '../entities/Transaction';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDTO {
  @ApiProperty({
    type: 'string',
    format: 'UUID',
    example: 'ead9f656-5119-472d-a492-1795dc335bb2',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string;

  @ApiProperty({
    type: 'string',
    format: 'UUID',
    example: '1ff00825-10c1-4951-bc0b-0e8ea9a96f86',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  transactionCategoryId: string;

  @ApiProperty({ example: 'Conta de água' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @ApiProperty({ example: '2025-07-28T17:46:47.071Z' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    enum: TransactionType,
    enumName: 'TransactionType',
    example: 'EXPENSE',
  })
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
