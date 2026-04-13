import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roomId = request.params.id;

    if (!roomId) throw new BadRequestException('roomid not found');
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    console.log(room);
    if (!room) throw new NotFoundException('Room not found');

    if (room.userId !== user.id)
      throw new ForbiddenException('you dont have access to this room');

    return true;
  }
}
