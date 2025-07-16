import { Prisma } from 'generated/prisma';

export class UpdateBankAccountDTO {
  userId: string;
  bankAccountId: string;
  bankAccountDTO: Prisma.BankAccountUncheckedUpdateInput;
}
