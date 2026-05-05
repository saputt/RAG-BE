import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto, MessageRole } from './dto/create-message.dto';
import { AiService } from 'src/ai/ai.service';
import { MessageRepository } from './repositories/message.repository';
import { RoomRepository } from 'src/room/repositories/room.repository';
import { MessageRoomRepository } from 'src/room/repositories/message-room.repository';

@Injectable()
export class MessageService {
  constructor(
    private messageRepo: MessageRepository,
    private roomMessageRepo: MessageRoomRepository,
    private roomRepo: RoomRepository,
    private aiService: AiService,
  ) {}

  async getAllRoomMessage(id: string) {
    return this.messageRepo.getAllRoomChat(id);
  }

  async createMessage(data: CreateMessageDto, roomId: string) {
    const roomMessageExist =
      await this.roomMessageRepo.findMessageRoomById(roomId);
    if (!roomMessageExist)
      throw new NotFoundException(`room with id : ${roomId} doesnt exist`);
    const room = await this.roomRepo.getRoomById(roomMessageExist.roomid);
    const history = await this.messageRepo.getHistoryChat(roomId);

    const aiAnswer = await this.aiService.getAiResponse(
      data.content,
      room.collectionName,
      roomId,
      history,
      data.mode,
    );

    if (aiAnswer.error) throw new NotFoundException(aiAnswer.error);
    const userMessage = await this.messageRepo.createMessage(data, roomId);

    const dataBot = {
      content: aiAnswer.answer,
      role: MessageRole.BOT,
    };
    const asnwerAiToDb = await this.messageRepo.createMessage(dataBot, roomId);

    return {
      userMessage,
      botMessage: asnwerAiToDb,
    };
  }
}
