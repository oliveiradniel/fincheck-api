import { Injectable } from '@nestjs/common';

import { type Prisma } from '../../../../generated/prisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismService: PrismaService) {}

  create(userDTO: Prisma.UserUncheckedCreateInput) {
    return this.prismService.user.create({
      data: {
        ...userDTO,
        transaction_categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'travel', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },

              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },

              // Other
              { name: 'Outro', icon: 'other', type: 'INCOME' },
            ],
          },
        },
      },
    });
  }

  findById(id: string) {
    return this.prismService.user.findUnique({
      where: { id },
      select: { name: true, email: true },
    });
  }

  findByEmail(email: string, select?: Prisma.UserSelect) {
    return this.prismService.user.findUnique({
      where: { email },
      select,
    });
  }
}
