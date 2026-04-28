import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto, MessageRole } from './dto/create-message.dto';
import { RoomRepository } from 'src/room/room.repository';
import { MessageRepository } from './message.repository';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class MessageService {
  constructor(
    private repo: MessageRepository,
    private roomRepo: RoomRepository,
    private aiService: AiService,
  ) {}

  async getAllRoomMessage(id: string) {
    return this.repo.getAllRoomChat(id);
  }

  async createMessage(data: CreateMessageDto, roomId: string) {
    const roomExist = await this.roomRepo.getRoomById(roomId);
    if (!roomExist)
      throw new NotFoundException(`room with id : ${roomId} doesnt exist`);

    const history = await this.repo.getHistoryChat(roomId);

    const aiAnswer = await this.aiService.getAiResponse(
      data.content,
      roomExist.collectionName,
      roomId,
      history,
    );
    if (aiAnswer.error) throw new NotFoundException(aiAnswer.error);
    const userMessage = await this.repo.createMessage(data, roomId);

    const dataBot = {
      content: aiAnswer.answer,
      role: MessageRole.BOT,
    };
    const asnwerAiToDb = await this.repo.createMessage(dataBot, roomId);

    return {
      userMessage,
      botMessage: asnwerAiToDb,
    };
  }
}
