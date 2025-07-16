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

  create(
    transactionCategoryDTO: Prisma.TransactionCategoryUncheckedCreateInput,
  ) {
    return this.prismaService.transactionCategory.create({
      data: transactionCategoryDTO,
    });
  }
}
