import { Body, Controller, Post, SetMetadata } from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @SetMetadata('IS_PUBLIC', true)
  async signin(@Body() signinDTO: SignInDTO) {
    const token = await this.authService.signin(signinDTO);

    return token;
  }

  @Post('signup')
  @SetMetadata('IS_PUBLIC', true)
  async signup(@Body() signupDTO: SignUpDTO) {
    const registeredUser = await this.authService.signup(signupDTO);

    return registeredUser;
  }
}
