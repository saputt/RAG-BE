import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private repo: FileRepository) {}

  async createFile() {
    
  }
}
