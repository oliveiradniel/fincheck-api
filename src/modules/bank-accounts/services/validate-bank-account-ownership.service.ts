import { NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepo.findByUserIdAndBankAccountId(
      userId,
      bankAccountId,
    );

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.');
    }
  }
}
