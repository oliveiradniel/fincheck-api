import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { compare, hash } from 'bcryptjs';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

import { AuthenticateDTO } from './dto/authenticate.dto';
import { SignupDTO } from './dto/signup.dto';

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

  async signup(signupDTO: SignupDTO) {
    const { name, email, password } = signupDTO;

    const SALT = 10;

    const emailTaken = await this.usersRepo.findByEmail(email, { id: true });

    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, SALT);

    const registeredUser = await this.usersRepo.create({
      data: { name, email, password: hashedPassword },
    });

    return registeredUser;
  }
}
