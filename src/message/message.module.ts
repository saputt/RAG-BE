import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomModule } from 'src/room/room.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './repositories/message.repository';
import { AiModule } from 'src/ai/ai.module';

@Module({
  controllers: [MessageController],
  providers: [MessageRepository, MessageService],
  imports: [
    PrismaModule,
    forwardRef(() => AiModule),
    forwardRef(() => RoomModule),
  ],
})
export class MessageModule {}
