import { Injectable } from '@nestjs/common';

import { type Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionCategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByUserId(userId: string) {
    const categories = await this.prismaService.transactionCategory.findMany({
      where: { userId },
    });

    return categories;
  }

  async create(category: Prisma.TransactionCategoryCreateInput) {
    const createdCategory = await this.prismaService.transactionCategory.create(
      { data: category },
    );

    return createdCategory;
  }
}
