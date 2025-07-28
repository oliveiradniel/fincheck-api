import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { IsPublic } from 'src/shared/decorators/IsPublic';

import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong password.',
  })
  @ApiOperation({
    summary: 'Authenticates user credentials.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signinDTO: SignInDTO) {
    const token = await this.authService.signin(signinDTO);

    return token;
  }

  @ApiResponse({
    status: 201,
    description: 'Account created Successfully.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'This email is already in use.',
  })
  @ApiOperation({
    summary: 'Create an account.',
  })
  @Post('signup')
  async signup(@Body() signupDTO: SignUpDTO) {
    const registeredUser = await this.authService.signup(signupDTO);

    return registeredUser;
  }
}
