import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { compare, hash } from 'bcryptjs';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDTO: SignInDTO) {
    const { email, password } = signinDTO;

    const user = await this.usersRepo.findByEmail(email, {
      id: true,
      password: true,
    });
    if (!user) {
      throw new NotFoundException('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupDTO: SignUpDTO) {
    const { name, email, password } = signupDTO;

    const SALT = 10;

    const emailTaken = await this.usersRepo.findByEmail(email, { id: true });

    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, SALT);

    const registeredUser = await this.usersRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = await this.generateAccessToken(registeredUser.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
