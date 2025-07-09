import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthenticateDTO } from './dto/authenticate.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async authenticate(@Body() authDTO: AuthenticateDTO) {
    const token = await this.authService.authenticate(authDTO);

    return token;
  }

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    const registeredUser = await this.authService.signup(signupDTO);

    return registeredUser;
  }
}
