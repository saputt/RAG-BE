import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, EditRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller()
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private readonly service: RoomService) {}

  @Get('rooms')
  async gelAllRoomUser(@GetUser('id') id: string) {
    const rooms = await this.service.getAll(id);
    return {
      message: 'Get all rooms successfully',
      data: rooms,
    };
  }

  @Post('room')
  async createRoom(@Body() data: CreateRoomDto, @GetUser('id') id: string) {
    const room = await this.service.createRoom(data, id);
    return {
      message: 'Room successfullt add',
      data: room,
    };
  }

  @Get('room/:id')
  async getRoom(@Param('id') id: string) {
    const rooms = await this.service.getRoomById(id);
    return {
      message: `Get room with id : ${id} successfully`,
      data: rooms,
    };
  }

  @Delete('room/:id')
  async deleteRoom(@Param('id') id: string) {
    await this.service.deleteRoomById(id);
    return {
      message: `Delete room with id : ${id} successfully`,
    };
  }

  @Patch('room/:id')
  async updateRoom(@Param('id') id: string, @Body() data: EditRoomDto) {
    await this.service.updateRoomById(data, id);
  }
}
