import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @Post('room')
  async createQuizRoom(@Body() data: any) {
    this.service;
  }

  @Post('generate/:roomId')
  async generateQuiz(@Body() data: any, @Param('roomId') roomId: string) {
    await this.service.generateQuiz(roomId, data);
  }

  @Get('')
  async getAllQuiz() {}

  @Delete()
  async deleteQuiz() {}
}
