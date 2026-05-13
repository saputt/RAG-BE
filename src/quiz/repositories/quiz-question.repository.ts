import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizQuestionDto } from '../dto/create-quiz-question.dto';
import { UpdateQuizQuestion } from '../dto/update-quiz-question.dto';

@Injectable()
export class QuizQuestionRepository {
  constructor(private prisma: PrismaService) {}

  async createQuizQuestion(
    dataQuestion: CreateQuizQuestionDto,
    quizId: string,
  ) {
    return this.prisma.question.create({
      data: {
        correctAnswer: dataQuestion.correctAnswer,
        question: dataQuestion.question,
        options: dataQuestion.options as any,
        quizId,
      },
    });
  }

  async updateQuestion(dataUpdate: UpdateQuizQuestion, questionId: string) {
    return this.prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        score: dataUpdate.score || 0,
        userAnswer: dataUpdate.userAnswer || '',
      },
    });
  }
}
