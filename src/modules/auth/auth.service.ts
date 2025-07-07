import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

import { AuthenticateDTO } from './dto/authenticate.dto';

import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(authDTO: AuthenticateDTO) {
    const { email, password } = authDTO;

    const user = await this.usersRepo.findByEmail(email, {
      id: true,
      password: true,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials.');
    }

    const payload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
