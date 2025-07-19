import { Injectable } from '@nestjs/common';

import { type Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionCategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllByUserId(userId: string) {
    return this.prismaService.transactionCategory.findMany({
      where: { userId },
    });
  }

  findByUserIdAndTransactionCategoryId(
    userId: string,
    transactionCategoryId: string,
  ) {
    return this.prismaService.transactionCategory.findFirst({
      where: { id: transactionCategoryId, userId },
    });
  }

  create(
    transactionCategoryDTO: Prisma.TransactionCategoryUncheckedCreateInput,
  ) {
    return this.prismaService.transactionCategory.create({
      data: transactionCategoryDTO,
    });
  }
}
