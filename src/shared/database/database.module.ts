import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { UsersRepository } from './repositories/users.repositories';
import { TransactionCategoriesRepository } from './repositories/transaction-categories.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, TransactionCategoriesRepository],
  exports: [UsersRepository, TransactionCategoriesRepository],
})
export class DatabaseModule {}
