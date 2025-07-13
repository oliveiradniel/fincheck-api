import { Injectable } from '@nestjs/common';

import { TransactionCategoriesRepository } from 'src/shared/database/repositories/transaction-categories.repositories';

import { CreateTransactionCategoryDTO } from './dto/create-transaction-category.dto';

@Injectable()
export class TransactionCategoriesService {
  constructor(
    private readonly transactionCategoriesRepo: TransactionCategoriesRepository,
  ) {}

  async findAllByUserId(userId: string) {
    const transactionCategoriesList =
      await this.transactionCategoriesRepo.findAllByUserId(userId);

    return transactionCategoriesList;
  }

  async create(createTransactionCategoryDTO: CreateTransactionCategoryDTO) {
    const createdTransactionCategory =
      await this.transactionCategoriesRepo.create(createTransactionCategoryDTO);

    return createdTransactionCategory;
  }
}
