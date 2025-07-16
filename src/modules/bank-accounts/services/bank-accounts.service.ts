import { Injectable } from '@nestjs/common';

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

import { CreateBankAccountDTO } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDTO } from '../dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findAllByUserId(userId);
  }

  create(userId: string, createBankAccountDTO: CreateBankAccountDTO) {
    const { color, initialBalance, name, type } = createBankAccountDTO;

    return this.bankAccountsRepo.create({
      userId,
      color,
      initialBalance,
      name,
      type,
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDTO: UpdateBankAccountDTO,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    const { color, initialBalance, name, type } = updateBankAccountDTO;

    return this.bankAccountsRepo.update({
      userId,
      bankAccountId,
      bankAccountDTO: {
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepo.remove(userId, bankAccountId);

    return null;
  }
}
