import { Injectable } from '@nestjs/common';

import { type Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';

import { UpdateTransactionDTO } from './dto/update-transaction.dto';

import { Filters } from './entities/Filters';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllByUserId(userId: string, filters: Filters) {
    const { year, month, bankAccountId, type } = filters;

    return this.prismaService.transaction.findMany({
      where: {
        userId,
        bankAccountId,
        type,
        date: {
          gte: new Date(Date.UTC(year, month)),
          lt: new Date(Date.UTC(year, month + 1)),
        },
      },
      include: {
        transactionCategory: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  findByUserIdAndTransactionId(userId: string, transactionId: string) {
    return this.prismaService.transaction.findFirst({
      where: { id: transactionId, userId },
    });
  }

  create(transactionDTO: Prisma.TransactionUncheckedCreateInput) {
    return this.prismaService.transaction.create({ data: transactionDTO });
  }

  update({ userId, transactionId, transactionDTO }: UpdateTransactionDTO) {
    return this.prismaService.transaction.update({
      where: { id: transactionId, userId },
      data: transactionDTO,
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.prismaService.transaction.delete({
      where: { id: transactionId, userId },
    });
  }
}
