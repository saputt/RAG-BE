import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageRepository {
  constructor(private prisma: PrismaService) {}

  async getAllRoomChat(id: string) {
    return this.prisma.message.findMany({
      where: {
        roomId: id,
      },
    });
  }

  async createMessage(data: CreateMessageDto, roomId: string) {
    return this.prisma.message.create({
      data: {
        content: data.content,
        role: data.role || 'USER',
        roomId,
      },
    });
  }

  async getHistoryChat(roomId: string) {
    return this.prisma.message.findMany({
      where: {
        id: roomId,
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: {
        content: true,
        role: true,
        roomId: true,
        createdAt: true,
      },
    });
  }
}
