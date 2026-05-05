import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { QuizModule } from './quiz/quiz.module';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    MessageModule,
    AiModule,
    QuizModule,
    RoomModule,
  ],
})
export class AppModule {}
