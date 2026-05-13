import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private service: MessageService) {}

  @Get('messages/:roomMessageId')
  async getAllMessage(@Param('roomMessageId') roomMessageId: string) {
    const messages = await this.service.getAllRoomMessage(roomMessageId);
    return {
      message: `get all messages with roomId : ${roomMessageId} successfully`,
      data: messages,
    };
  }

  @Post('message/:roomMessageId')
  async createMessage(
    @Body() data: CreateMessageDto,
    @Param('roomMessageId') roomMessageId: string,
  ) {
    const message = await this.service.createMessage(data, roomMessageId);
    return {
      message: 'create new message successfully',
      data: message,
    };
  }
}
