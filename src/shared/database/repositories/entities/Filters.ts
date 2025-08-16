import { TransactionType } from 'src/modules/transactions/entities/Transaction';

export interface Filters {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: TransactionType;
}
