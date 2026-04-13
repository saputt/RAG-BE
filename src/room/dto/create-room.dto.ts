import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class EditRoomDto extends CreateRoomDto {}
