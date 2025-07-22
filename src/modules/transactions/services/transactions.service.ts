import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateTransactionCategoryOwnershipService } from 'src/modules/transaction-categories/services/validate-transaction-category-ownership.service';

import { CreateTransactionDTO } from '../dto/create-transaction.dto';
import { UpdateTransactionDTO } from '../dto/update-transaction.dto';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateTransactionCategoryOwnershipService: ValidateTransactionCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  findAll(userId: string, filters: { month: number; year: number }) {
    return this.transactionsRepo.findAllByUserId(userId, filters);
  }

  async create(userId: string, createTransactionDTO: CreateTransactionDTO) {
    const { bankAccountId, transactionCategoryId, name, value, date, type } =
      createTransactionDTO;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      transactionCategoryId,
    });

    return this.transactionsRepo.create({
      userId,
      bankAccountId,
      transactionCategoryId,
      name,
      value,
      date,
      type,
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDTO: UpdateTransactionDTO,
  ) {
    const { bankAccountId, transactionCategoryId, name, value, date, type } =
      updateTransactionDTO;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      transactionCategoryId,
      transactionId,
    });

    return this.transactionsRepo.update({
      userId,
      transactionId,
      transactionDTO: {
        bankAccountId,
        transactionCategoryId,
        name,
        value,
        date,
        type,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionsRepo.remove(userId, transactionId);

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    transactionCategoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    transactionCategoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      transactionCategoryId &&
        this.validateTransactionCategoryOwnershipService.validate(
          userId,
          transactionCategoryId,
        ),
    ]);
  }
}
