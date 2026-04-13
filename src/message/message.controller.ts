import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private service: MessageService) {}

  @Get('messages/:roomId')
  async getAllMessage(@Param('roomId') id: string) {
    const messages = await this.service.getAllRoomMessage(id);
    return {
      message: `get all messages with roomId : ${id} successfully`,
      data: messages,
    };
  }

  @Post('message/:roomId')
  async createMessage(
    @Body() data: CreateMessageDto,
    @Param('roomId') roomId: string,
  ) {
    const message = await this.service.createMessage(data, roomId);
    return {
      message: 'create new message successfully',
      data: message,
    };
  }
}
