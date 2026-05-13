import { forwardRef, Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageModule } from 'src/message/message.module';
import { RoomRepository } from './repositories/room.repository';
import { QuizRoomRepository } from './repositories/quiz-room.repository';
import { MessageRoomRepository } from './repositories/message-room.repository';

@Module({
  controllers: [RoomController],
  providers: [
    RoomService,
    RoomRepository,
    QuizRoomRepository,
    MessageRoomRepository,
  ],
  imports: [PrismaModule, forwardRef(() => MessageModule)],
  exports: [RoomRepository, QuizRoomRepository, MessageRoomRepository],
})
export class RoomModule {}
