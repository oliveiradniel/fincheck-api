import { Injectable } from '@nestjs/common';

import { type Prisma } from '../../../../generated/prisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismService: PrismaService) {}

  async create({ data }: Prisma.UserCreateArgs) {
    const user = await this.prismService.user.create({
      data: {
        ...data,
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

    return user;
  }

  async findById(id: string) {
    const user = await this.prismService.user.findUnique({
      where: { id },
      select: { name: true, email: true },
    });

    return user;
  }

  async findByEmail(email: string, select?: Prisma.UserSelect) {
    const user = await this.prismService.user.findUnique({
      where: { email },
      select,
    });

    return user;
  }
}
