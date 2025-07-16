import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { BankAccountsService } from './services/bank-accounts.service';

import { CreateBankAccountDTO } from './dto/create-bank-account.dto';
import { UpdateBankAccountDTO } from './dto/update-bank-account.dto';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDTO: CreateBankAccountDTO,
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDTO);
  }

  @Put(':bankAccountId')
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDTO: UpdateBankAccountDTO,
  ) {
    return this.bankAccountsService.update(
      userId,
      bankAccountId,
      updateBankAccountDTO,
    );
  }

  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.remove(userId, bankAccountId);
  }
}
