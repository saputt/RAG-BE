import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto, EditRoomDto } from './dto/create-room.dto';
import { RoomRepository } from './repositories/room.repository';
import { MessageRoomRepository } from './repositories/message-room.repository';
import { QuizRoomRepository } from './repositories/quiz-room.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly repo: RoomRepository,
    private readonly repoRoomMessage: MessageRoomRepository,
    private readonly repoRoomQuiz: QuizRoomRepository,
  ) {}

  async createRoomQuiz(roomId: string) {
    return this.repoRoomQuiz.createQuizRoom(roomId);
  }

  async createRoomMessage(roomId: string) {
    return this.repoRoomMessage.createMessageRoom(roomId);
  }

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
    const roomFiles = await this.repo.getRoomFile(id);

    console.log(`room files : ${roomFiles.files}`);

    return await this.repo.deleteRoom(id);
  }

  async updateRoomById(data: EditRoomDto, id: string) {
    return await this.repo.editRoom(data, id);
  }

  async createRoom(data: CreateRoomDto, id: string) {
    const room = await this.repo.createRoom(data, id);

    const messageRoom = await this.repoRoomMessage.createMessageRoom(room.id);

    return {
      id: room.id,
      name: room.name,
      chatRoomId: messageRoom.id,
      collection_name: room.collectionName,
    };
  }
}
