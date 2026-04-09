import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
  ],
})
export class AuthModule {}
