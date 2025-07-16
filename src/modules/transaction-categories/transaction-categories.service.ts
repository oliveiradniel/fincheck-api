import { Injectable } from '@nestjs/common';

import { TransactionCategoriesRepository } from 'src/shared/database/repositories/transaction-categories.repositories';

import { CreateTransactionCategoryDTO } from './dto/create-transaction-category.dto';

@Injectable()
export class TransactionCategoriesService {
  constructor(
    private readonly transactionCategoriesRepo: TransactionCategoriesRepository,
  ) {}

  findAllByUserId(userId: string) {
    return this.transactionCategoriesRepo.findAllByUserId(userId);
  }

  create(createTransactionCategoryDTO: CreateTransactionCategoryDTO) {
    return this.transactionCategoriesRepo.create(createTransactionCategoryDTO);
  }
}
