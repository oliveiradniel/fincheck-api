import { Prisma } from 'generated/prisma';

export class UpdateTransactionDTO {
  userId: string;
  transactionId: string;
  transactionDTO: Prisma.TransactionUncheckedUpdateInput;
}
