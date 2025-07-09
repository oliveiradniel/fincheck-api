import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@Request() request: any) {
    const user = await this.usersService.getUserById(request.userId as string);

    return user;
  }
}
