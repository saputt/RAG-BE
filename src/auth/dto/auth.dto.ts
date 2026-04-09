import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsString,
  isString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Format not valid' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Min password is 8 character' })
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

//mengambil type berdasarkan RegisterDto
export class LoginDto extends PickType(RegisterDto, [
  'email',
  'password',
] as const) {}
