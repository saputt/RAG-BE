import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto, EditRoomDto } from './dto/room.dto';

@Injectable()
export class RoomRepository {
  constructor(private prisma: PrismaService) {}

  async getAllRooms() {
    return await this.prisma.room.findMany();
  }

  async getRoomById(id: string) {
    return await this.prisma.room.findUnique({
      where: {
        id,
      },
    });
  }

  async createRoom(data: CreateRoomDto) {
    return await this.prisma.room.create({
      data: {
        name: data.name,
        userId: data.userId,
      },
    });
  }

  async deleteRoom(id: string) {
    return await this.prisma.room.delete({
      where: {
        id,
      },
    });
  }

  async editRoom(data: EditRoomDto, id: string) {
    return await this.prisma.room.update({
      where: {
        id,
      },
      data,
    });
  }
}
