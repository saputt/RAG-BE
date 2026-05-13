import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizRoomRepository {
  constructor(private prisma: PrismaService) {}

  async getQuizRoomByRoomId(roomId: string) {
    return this.prisma.quizRoom.findUnique({
      where: {
        roomid: roomId,
      },
    });
  }

  async createQuizRoom(roomId: string) {
    return this.prisma.quizRoom.create({
      data: {
        room: {
          connect: {
            id: roomId,
          },
        },
      },
    });
  }
}
