import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum MessageRole {
  USER = 'USER',
  BOT = 'BOT',
}

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(MessageRole)
  @IsOptional()
  role?: MessageRole;
}
