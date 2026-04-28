import { Controller, Param, Post } from '@nestjs/common';
import { FileService } from './file.service';

@Controller()
export class FileController {
  constructor(private service: FileService) {}

  @Post('file/:roomId')
  async createFile(@Param('roomId') roomId: string) {
    await this.service
  }
}
