import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty({ example: 'Daniel Oliveira' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'kadadniel@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
