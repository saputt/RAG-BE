import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { RoomRepository } from 'src/room/room.repository';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(
    private repo: MessageRepository,
    private roomRepo: RoomRepository,
  ) {}

  async getAllRoomMessage(id: string) {
    return this.repo.getAllRoomChat(id);
  }

  async createMessage(data: CreateMessageDto, roomId: string) {
    const roomExist = await this.roomRepo.getRoomById(roomId);
    if (!roomExist)
      throw new NotFoundException(`room with id : ${roomId} doesnt exist`);
    return this.repo.createMessage(data, roomId);
  }
}
