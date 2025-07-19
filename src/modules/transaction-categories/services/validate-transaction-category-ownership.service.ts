import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionCategoriesRepository } from 'src/shared/database/repositories/transaction-categories.repositories';

@Injectable()
export class ValidateTransactionCategoryOwnershipService {
  constructor(
    private readonly transactionCategoriesRepo: TransactionCategoriesRepository,
  ) {}

  async validate(userId: string, transactionCategoryId: string) {
    const isOwner =
      await this.transactionCategoriesRepo.findByUserIdAndTransactionCategoryId(
        userId,
        transactionCategoryId,
      );

    if (!isOwner) {
      throw new NotFoundException('Transaction category not found');
    }
  }
}
