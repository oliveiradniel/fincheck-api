import { ConflictException, Injectable } from '@nestjs/common';

import { hash } from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const SALT = 10;

    const emailTaken = await this.usersRepo.findByEmail(email, { id: true });

    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, SALT);

    const user = await this.usersRepo.create({
      data: { name, email, password: hashedPassword },
    });

    return user;
  }
}
