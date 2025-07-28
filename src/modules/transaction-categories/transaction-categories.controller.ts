import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateTransactionCategoryDTO } from './dto/create-transaction-category.dto';

import { TransactionCategoriesService } from './services/transaction-categories.service';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('transaction-categories')
export class TransactionCategoriesController {
  constructor(
    private readonly transactionCategoriesService: TransactionCategoriesService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'All transaction categories.',
    schema: {
      example: [
        {
          id: 'bcdd6f42-7627-4d82-bfb6-494d41f0fa4e',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Salário',
          icon: 'travel',
          type: 'INCOME',
        },
        {
          id: 'bf68f115-798c-4105-b61a-ea63dea9aaaf',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Freelance',
          icon: 'freelance',
          type: 'INCOME',
        },
        {
          id: '1ff00825-10c1-4951-bc0b-0e8ea9a96f86',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Outro',
          icon: 'other',
          type: 'INCOME',
        },
        {
          id: '3f63a034-2333-4834-a71a-dbc29e0b16d7',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Casa',
          icon: 'home',
          type: 'EXPENSE',
        },
        {
          id: '6a9cc97c-754b-44b5-a480-58667237e2c3',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Alimentação',
          icon: 'food',
          type: 'EXPENSE',
        },
        {
          id: '721c7f91-4ea9-4932-be9c-5d7178145696',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Educação',
          icon: 'education',
          type: 'EXPENSE',
        },
        {
          id: 'ad2c40ce-9087-46b1-ae56-332b841ee3f1',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Lazer',
          icon: 'fun',
          type: 'EXPENSE',
        },
        {
          id: '5e5c2068-8914-43c5-bacc-5a5ddeac3717',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Mercado',
          icon: 'grocery',
          type: 'EXPENSE',
        },
        {
          id: '46aef9b6-f20e-49c4-a7eb-f009e1b2c3f4',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Roupas',
          icon: 'clothes',
          type: 'EXPENSE',
        },
        {
          id: '8d14c030-1f6e-4054-9e4b-61ee912189a0',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Transporte',
          icon: 'transport',
          type: 'EXPENSE',
        },
        {
          id: '49066696-e390-4060-b643-4202388506fc',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'Viagem',
          icon: 'travel',
          type: 'EXPENSE',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({ summary: 'Get all transaction categories.' })
  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.transactionCategoriesService.findAllByUserId(userId);
  }

  @ApiResponse({
    status: 201,
    description: 'Transaction category created with success.',
    schema: {
      example: {
        id: 'bcdd6f42-7627-4d82-bfb6-494d41f0fa4e',
        userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
        name: 'Salário',
        icon: 'travel',
        type: 'INCOME',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({ summary: 'Create a new transaction category.' })
  @Post()
  create(@Body() createTransactionCategoryDTO: CreateTransactionCategoryDTO) {
    return this.transactionCategoriesService.create(
      createTransactionCategoryDTO,
    );
  }
}
