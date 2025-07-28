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

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @ApiResponse({
    status: 200,
    description: 'All bank accounts.',
    schema: {
      example: [
        {
          id: 'ff2edb37-e858-4bad-ab39-b3279f7ff395',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'XP Investimentos',
          initialBalance: 20000,
          type: 'INVESTIMENT',
          color: '#333',
          currentBalance: 20000,
        },
        {
          id: 'ead9f656-5119-472d-a492-1795dc335bb2',
          userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
          name: 'NuBank',
          initialBalance: 10000,
          type: 'CHECKING',
          color: '#7950f2',
          currentBalance: 10000,
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({ summary: 'Get all bank accounts.' })
  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @ApiResponse({
    status: 201,
    description: 'Bank account created with success.',
    schema: {
      example: {
        id: 'ff2edb37-e858-4bad-ab39-b3279f7ff395',
        userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
        name: 'XP Investimentos',
        initialBalance: 10000,
        type: 'INVESTIMENT',
        color: '#333',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({ summary: 'Create a bank account.' })
  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDTO: CreateBankAccountDTO,
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'Bank account updated with success.',
    schema: {
      example: {
        id: 'ff2edb37-e858-4bad-ab39-b3279f7ff395',
        userId: 'c89d2038-0199-4087-98c6-63a08a359f32',
        name: 'XP Investimentos',
        initialBalance: 10000,
        type: 'INVESTIMENT',
        color: '#333',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Bank account not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({ summary: 'Update a bank account.' })
  @ApiParam({
    name: 'bankAccountId',
    type: 'string',
    description: 'Bank account id to be updated.',
  })
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

  @ApiResponse({
    status: 204,
    description: 'Bank account deleted with success.',
  })
  @ApiResponse({
    status: 404,
    description: 'Bank account not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({ summary: 'Delete a bank account' })
  @ApiParam({
    name: 'bankAccountId',
    type: 'string',
    description: 'Bank account id to be deleted.',
  })
  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.remove(userId, bankAccountId);
  }
}
