import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';

@Injectable()
export class QuizRepository {
  constructor(private prisma: PrismaService) {}

  async createQuiz(dataQuiz: CreateQuizDto, quizRoomId: string) {
    return this.prisma.quiz.create({
      data: {
        title: dataQuiz.title,
        quizRoom: {
          connect: {
            id: quizRoomId,
          },
        },
      },
    });
  }

  async updateQuiz(dataQuiz: UpdateQuizDto, quizId: string) {
    return this.prisma.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        finish: dataQuiz.finish,
        title: dataQuiz.title,
      },
    });
  }

  async deleteQuiz(quizId: string) {
    return this.prisma.quiz.delete({
      where: {
        id: quizId,
      },
    });
  }
}
