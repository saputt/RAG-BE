import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuizRepository } from './repositories/quiz.repository';
import { QuizQuestionRepository } from './repositories/quiz-question.repository';
import { RoomModule } from 'src/room/room.module';

@Module({
  controllers: [QuizController],
  providers: [QuizService, QuizRepository, QuizQuestionRepository],
  imports: [PrismaModule, RoomModule],
})
export class QuizModule {}
