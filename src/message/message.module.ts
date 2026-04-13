import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomModule } from 'src/room/room.module';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [MessageRepository, MessageService],
  imports: [PrismaModule, RoomModule],
})
export class MessageModule {}
