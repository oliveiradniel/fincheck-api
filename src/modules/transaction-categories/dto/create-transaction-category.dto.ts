import { Prisma } from 'generated/prisma';

export class CreateTransactionCategoryDTO {
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
  userId: string;
  user: Prisma.UserCreateNestedOneWithoutTransaction_categoriesInput;
}
