import { Module } from '@nestjs/common';

import { TransactionCategoriesController } from './transaction-categories.controller';

import { TransactionCategoriesService } from './services/transaction-categories.service';
import { ValidateTransactionCategoryOwnershipService } from './services/validate-transaction-category-ownership.service';

@Module({
  controllers: [TransactionCategoriesController],
  providers: [
    TransactionCategoriesService,
    ValidateTransactionCategoryOwnershipService,
  ],
  exports: [ValidateTransactionCategoryOwnershipService],
})
export class TransactionCategoriesModule {}
