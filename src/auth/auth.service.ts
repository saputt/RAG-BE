import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { hashing } from 'src/common/utils/hash.util';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private repo: AuthRepository,
    private jwt: JwtService,
  ) {}

  private async signToken(userId: string, email: string) {
    const payload = { id: userId, email };

    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    return token;
  }

  async login(data: LoginDto) {
    const isUserExist = await this.repo.findUserByEmail(data.email);
    if (isUserExist == null || isUserExist == undefined)
      throw new NotFoundException(`User with email : ${data.email} not found`);
    const isSamePassword = await hashing.compare(
      data.password,
      isUserExist.password,
    );
    if (!isSamePassword) throw new ForbiddenException('Wrong password');
    const token = await this.signToken(isUserExist.id, isUserExist.email);
    return {
      user: {
        id: isUserExist.id,
        name: isUserExist.name,
        email: isUserExist.email,
      },
      token,
    };
  }

  async register(data: RegisterDto) {
    const isUserExist = await this.repo.findUserByEmail(data.email);
    if (isUserExist)
      throw new ConflictException(`Email : ${data.email} is already exist`);
    const hashedPassword = await hashing.hash(data.password);
    const dataUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };
    const newUser = await this.repo.createNewUser(dataUser);
    const token = await this.signToken(newUser.id, newUser.email);
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    };
  }
}
