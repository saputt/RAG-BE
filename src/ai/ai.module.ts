import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { RoomModule } from 'src/room/room.module';
import { FileModule } from 'src/file/file.module';

@Module({
  providers: [AiService],
  exports: [AiService],
  controllers: [AiController],
  imports: [RoomModule, FileModule],
})
export class AiModule {}
