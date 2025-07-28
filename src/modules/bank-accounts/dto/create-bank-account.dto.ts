import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { BankAccountType } from '../entities/BankAccount';

import { ApiProperty } from '@nestjs/swagger';

export class CreateBankAccountDTO {
  @ApiProperty({ example: 'XP Investimentos' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @ApiProperty({
    enum: BankAccountType,
    enumName: 'BankAccountType',
    example: 'INVESTIMENT',
  })
  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @ApiProperty({ example: '#333' })
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
