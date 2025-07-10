import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { IsPublic } from 'src/shared/decorators/IsPublic';

import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() signinDTO: SignInDTO) {
    const token = await this.authService.signin(signinDTO);

    return token;
  }

  @Post('signup')
  async signup(@Body() signupDTO: SignUpDTO) {
    const registeredUser = await this.authService.signup(signupDTO);

    return registeredUser;
  }
}
