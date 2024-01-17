import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'email login',
    minimum: 3,
    type: 'string',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password login',
    minimum: 8,
    type: 'string',
  })
  @ApiProperty()
  @IsString()
  password: string;
}

export class SignupDto {
  @ApiProperty({
    description: 'email register',
    minimum: 3,
    type: 'string',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'email register',
    type: 'string',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password register',
    minimum: 3,
    type: 'string',
  })
  @IsString()
  password: string;
}
