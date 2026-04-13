import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomRepository } from './room.repository';
import { CreateRoomDto, EditRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly repo: RoomRepository) {}

  async getAll(id: string) {
    const rooms = await this.repo.getAllRooms(id);
    console.log(rooms);
    return rooms;
  }

  async getRoomById(id: string) {
    const roomExist = await this.repo.getRoomById(id);
    if (!roomExist) throw new NotFoundException(`r`);
    return await this.repo.getRoomById(id);
  }

  async deleteRoomById(id: string) {
    const isRoomExist = await this.repo.getRoomById(id);
    if (isRoomExist == null || isRoomExist == undefined)
      throw new NotFoundException(`room with id : ${id} not found`);
    return await this.repo.deleteRoom(id);
  }

  async updateRoomById(data: EditRoomDto, id: string) {
    return await this.repo.editRoom(data, id);
  }

  async createRoom(data: CreateRoomDto, id: string) {
    const room = await this.repo.createRoom(data, id);
    return {
      id: room.id,
      name: room.name,
    };
  }
}
