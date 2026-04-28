import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';
import { FileController } from './file.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [FileService, FileRepository],
  controllers: [FileController],
  exports: [FileRepository],
  imports: [PrismaModule],
})
export class FileModule {}
