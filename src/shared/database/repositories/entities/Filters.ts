import { TransactionType } from 'src/modules/transactions/entities/Transaction';

export interface Filters {
  year: number;
  month: number;
  bankAccountId?: string | undefined;
  type?: TransactionType | undefined;
}
