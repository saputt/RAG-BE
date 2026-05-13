import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from './repositories/quiz.repository';
import { QuizQuestionRepository } from './repositories/quiz-question.repository';
import { QuizRoomRepository } from 'src/room/repositories/quiz-room.repository';
import { RoomRepository } from 'src/room/repositories/room.repository';

@Injectable()
export class QuizService {
  constructor(
    private quizRepo: QuizRepository,
    private quizRoomRepo: QuizRoomRepository,
    private quizQuestionRepo: QuizQuestionRepository,
    private roomRepo: RoomRepository,
  ) {}

  async generateQuiz(roomId: string, quizData: any) {
    const roomExist = await this.roomRepo.getRoomById(roomId);
    if (!roomExist)
      throw new NotFoundException(`Room with id : ${roomId} doesnt exist`);
    const roomQuizExist = await this.quizRoomRepo.getQuizRoomByRoomId(roomId);
    if (!roomQuizExist) {
      const quizRoom = await this.quizRoomRepo.createQuizRoom(roomId);
      const quiz = await this.quizRepo.createQuiz(quizData, quizRoom.id);
      const question = await this.quizQuestionRepo.createQuizQuestion(
        quizData,
        quiz.id,
      );
    }
  }
}
