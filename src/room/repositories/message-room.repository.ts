import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageRoomRepository {
  constructor(private prisma: PrismaService) {}

  async findMessageRoomById(messageRoomId: string) {
    return this.prisma.chatRoom.findUnique({
      where: {
        id: messageRoomId,
      },
    });
  }

  async createMessageRoom(roomId: string) {
    return this.prisma.chatRoom.create({
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
