import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() CreateUserDTO: CreateUserDTO) {
    const createdUser = this.usersService.create(CreateUserDTO);

    return createdUser;
  }
}
