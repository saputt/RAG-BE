import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomRepository } from './room.repository';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  imports: [PrismaModule],
  exports: [RoomRepository],
})
export class RoomModule {}
