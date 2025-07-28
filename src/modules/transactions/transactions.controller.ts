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
} from '@nestjs/common';

import { TransactionsService } from './services/transactions.service';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { GetTransactionsQueryDTO } from './dto/get-transactions-query.dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiResponse({
    status: 200,
    description: 'All transactions.',
    schema: {
      example: [
        {
          id: '8f230265-f72a-48b5-a8e2-b1528ca475fc',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          bankAccountId: 'ead9f656-5119-472d-a492-1795dc335bb2',
          transactionCategoryId: '1ff00825-10c1-4951-bc0b-0e8ea9a96f86',
          name: 'Conta de água',
          value: 100,
          date: '2025-07-28T17:46:47.071Z',
          type: 'EXPENSE',
        },
        {
          id: '498be79b-3861-4955-beba-605edaca5420',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          bankAccountId: 'ead9f656-5119-472d-a492-1795dc335bb2',
          transactionCategoryId: '1ff00825-10c1-4951-bc0b-0e8ea9a96f86',
          name: 'Conta de energia',
          value: 100,
          date: '2025-07-28T17:49:34.567Z',
          type: 'EXPENSE',
        },
        {
          id: '5dfa26ac-cbf9-4366-814f-331931f6da02',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          bankAccountId: 'ead9f656-5119-472d-a492-1795dc335bb2',
          transactionCategoryId: '721c7f91-4ea9-4932-be9c-5d7178145696',
          name: 'Curso de programação',
          value: 1200,
          date: '2025-07-28T17:50:05.624Z',
          type: 'EXPENSE',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({ summary: 'Get all transactions.' })
  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query() query: GetTransactionsQueryDTO,
  ) {
    const { year, month, bankAccountId, type } = query;

    return this.transactionsService.findAll(userId, {
      month,
      year,
      bankAccountId,
      type,
    });
  }

  @ApiResponse({
    status: 201,
    description: 'Transaction created with success.',
    schema: {
      example: {
        id: '498be79b-3861-4955-beba-605edaca5420',
        userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
        bankAccountId: 'ead9f656-5119-472d-a492-1795dc335bb2',
        transactionCategoryId: '1ff00825-10c1-4951-bc0b-0e8ea9a96f86',
        name: 'Conta de água',
        value: 100,
        date: '2025-07-28T17:46:47.071Z',
        type: 'EXPENSE',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Transaction not found or Bank account not found or Transaction category not found.',
  })
  @ApiOperation({ summary: 'Create a transaction.' })
  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDTO: CreateTransactionDTO,
  ) {
    return this.transactionsService.create(userId, createTransactionDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'Transaction updated with success.',
    schema: {
      example: {
        id: '498be79b-3861-4955-beba-605edaca5420',
        userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
        bankAccountId: 'ead9f656-5119-472d-a492-1795dc335bb2',
        transactionCategoryId: '1ff00825-10c1-4951-bc0b-0e8ea9a96f86',
        name: 'Conta de água',
        value: 100,
        date: '2025-07-28T17:46:47.071Z',
        type: 'EXPENSE',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Transaction not found or Bank account not found or Transaction category not found.',
  })
  @ApiOperation({ summary: 'Update a transaction.' })
  @ApiParam({
    name: 'transactionId',
    type: 'string',
    description: 'Transaction id to be updated.',
  })
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

  @ApiResponse({
    status: 204,
    description: 'Transaction deleted with succcess.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found.',
  })
  @ApiOperation({ summary: 'Delete a transaction.' })
  @ApiParam({
    name: 'transactionId',
    type: 'string',
    description: 'Transaction id to be deleted.',
  })
  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
