import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { TransactionsService } from './services/transactions.service';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

import { OptionalParseUUIDPipe } from 'src/shared/pipes/OptionalParseUUIDPipe';

import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';

import { TransactionType } from './entities/Transaction';
import { OptionalParseEnumPipe } from 'src/shared/pipes/OptionalParseEnumPipe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(TransactionType))
    type?: TransactionType,
  ) {
    return this.transactionsService.findAll(userId, {
      month,
      year,
      bankAccountId,
      type,
    });
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDTO: CreateTransactionDTO,
  ) {
    return this.transactionsService.create(userId, createTransactionDTO);
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ) {
    return this.transactionsService.update(
      userId,
      transactionId,
      updateTransactionDTO,
    );
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
