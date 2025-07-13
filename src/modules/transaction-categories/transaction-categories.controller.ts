import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateTransactionCategoryDTO } from './dto/create-transaction-category.dto';

import { TransactionCategoriesService } from './transaction-categories.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('transaction-categories')
export class TransactionCategoriesController {
  constructor(
    private readonly transactionCategoriesService: TransactionCategoriesService,
  ) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.transactionCategoriesService.findAllByUserId(userId);
  }

  @Post()
  create(@Body() createTransactionCategoryDTO: CreateTransactionCategoryDTO) {
    return this.transactionCategoriesService.create(
      createTransactionCategoryDTO,
    );
  }
}
