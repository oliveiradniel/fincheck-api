import { ConflictException, Injectable } from '@nestjs/common';

import { hash } from 'bcryptjs';

import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDTO: CreateUserDTO) {
    const { name, email, password } = createUserDTO;

    const SALT = 10;

    const emailTaken = await this.usersRepo.findByEmail(email, { id: true });

    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, SALT);

    const createdUser = await this.usersRepo.create({
      data: { name, email, password: hashedPassword },
    });

    return createdUser;
  }
}
