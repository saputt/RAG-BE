import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AiController {
  constructor(private readonly service: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('ingest/:roomId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Param('roomId') roomId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.ingestFile(file, roomId);
  }
}
