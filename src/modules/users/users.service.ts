import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(id: string) {
    const user = await this.usersRepo.findById(id);

    return user;
  }
}
