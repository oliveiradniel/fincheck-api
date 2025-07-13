import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionCategoriesModule } from './modules/transaction-categories/transaction-categories.module';

import { AuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [
    UsersModule,
    TransactionCategoriesModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
