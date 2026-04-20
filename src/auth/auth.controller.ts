import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const authData = await this.service.login(data);
    return {
      message: 'Login successfull',
      data: authData,
    };
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const authData = await this.service.register(data);
    return {
      message: 'Register successfull',
      data: authData,
    };
  }
}
