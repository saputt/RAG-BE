import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileRepository } from 'src/file/file.repository';
import { RoomRepository } from 'src/room/room.repository';
import { json } from 'stream/consumers';

@Injectable()
export class AiService {
  constructor(
    private configService: ConfigService,
    private roomRepo: RoomRepository,
    private fileRepo: FileRepository,
  ) {}

  async getAiResponse(
    prompt: string,
    collectionName: string,
    roomid: string,
    history: any[],
  ) {
    const pyUrl = this.configService.get<string>('PYTHON_SERVICE_URL');

    const response = await fetch(`${pyUrl}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: prompt,
        collection_name: collectionName,
        history,
        room_id: roomid,
      }),
    });

    if (!response.ok) throw new Error('FastAPI unreachable');

    const data = await response.json();

    return data;
  }

  async ingestFile(file: Express.Multer.File, roomId: string) {
    const roomExist = await this.roomRepo.getRoomById(roomId);

    if (!roomExist)
      throw new NotFoundException(`Room with id : ${roomId} not found`);

    await this.fileRepo;

    const pyUrl = this.configService.get<string>('PYTHON_SERVICE_URL');
    const formData = new FormData();

    const blobPart = new Uint8Array(file.buffer);
    const blob = new Blob([blobPart], { type: file.mimetype });

    formData.append('file', blob, file.originalname);
    formData.append('collection_name', roomExist.collectionName);

    const response = await fetch(`${pyUrl}/ingest`, {
      method: 'POST',
      body: formData,
    });
    console.log(response);
    if (!response.ok) throw new Error('Failed to ingest file to python');

    return await response.json();
  }
}
