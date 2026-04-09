import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomRepository } from './room.repository';
import { CreateRoomDto, EditRoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly repo: RoomRepository) {}

  async getAll() {
    return await this.repo.getAllRooms();
  }

  async getRoomById(id: string) {
    return await this.repo.getRoomById(id);
  }

  async deleteRoomById(id: string) {
    return await this.repo.deleteRoom(id);
  }

  async updateRoomById(data: EditRoomDto, id: string) {
    return await this.repo.editRoom(data, id);
  }

  async createRoom(data: CreateRoomDto) {
    return await this.repo.createRoom(data);
  }
}
