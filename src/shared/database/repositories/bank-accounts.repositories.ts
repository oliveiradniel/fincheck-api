import { Injectable } from '@nestjs/common';

import { type Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import { UpdateBankAccountDTO } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById(bankAccountId: string) {
    return this.prismaService.bankAccount.findUnique({
      where: { id: bankAccountId },
    });
  }

  findAllByUserId(userId: string) {
    return this.prismaService.bankAccount.findMany({
      where: { userId },
    });
  }

  findByUserIdAndBankAccountId(userId: string, bankAccountId: string) {
    return this.prismaService.bankAccount.findFirst({
      where: { userId, id: bankAccountId },
    });
  }

  create(bankAccountDTO: Prisma.BankAccountUncheckedCreateInput) {
    return this.prismaService.bankAccount.create({
      data: bankAccountDTO,
    });
  }

  update({ userId, bankAccountId, bankAccountDTO }: UpdateBankAccountDTO) {
    return this.prismaService.bankAccount.update({
      where: { id: bankAccountId, userId },
      data: {
        ...bankAccountDTO,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.prismaService.bankAccount.delete({
      where: { id: bankAccountId, userId },
    });
  }
}
