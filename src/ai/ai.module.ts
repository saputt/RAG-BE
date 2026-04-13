import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { RoomModule } from 'src/room/room.module';

@Module({
  providers: [AiService],
  exports: [AiService],
  controllers: [AiController],
  imports: [RoomModule],
})
export class AiModule {}
