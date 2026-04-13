import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return {
      message: 'Login successfull',
      data: {
        accessToken: await this.service.login(data),
      },
    };
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    await this.service.register(data);
  }
}
