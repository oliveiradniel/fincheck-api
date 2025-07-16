import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { UsersRepository } from './repositories/users.repositories';
import { TransactionCategoriesRepository } from './repositories/transaction-categories.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    TransactionCategoriesRepository,
    BankAccountsRepository,
  ],
  exports: [
    UsersRepository,
    TransactionCategoriesRepository,
    BankAccountsRepository,
  ],
})
export class DatabaseModule {}
