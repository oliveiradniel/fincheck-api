import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { TransactionType } from 'src/modules/transactions/entities/Transaction';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionCategoryDTO {
  @ApiProperty({ example: 'Educação' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'education' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    enum: TransactionType,
    enumName: 'TransactionType',
    example: 'EXPENSE',
  })
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    type: 'string',
    format: 'UUID',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
