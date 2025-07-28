import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'Information about the logged in user.',
    schema: {
      example: {
        name: 'Daniel Kadã',
        email: 'kadadniel@gmail.com',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiOperation({ summary: 'Get data logged user.' })
  @Get('/me')
  async me(@ActiveUserId() userId: string) {
    const user = await this.usersService.getUserById(userId);

    return user;
  }
}
