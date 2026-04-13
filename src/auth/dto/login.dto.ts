import { PickType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';

//mengambil type berdasarkan RegisterDto
export class LoginDto extends PickType(RegisterDto, [
  'email',
  'password',
] as const) {}
