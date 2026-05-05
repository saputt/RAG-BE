import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum MessageRole {
  USER = 'USER',
  BOT = 'BOT',
}

export enum Mode {
  CHAT = 'CHAT',
  QUIZ = 'QUIZ',
}

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(MessageRole)
  @IsOptional()
  role?: MessageRole;

  @IsOptional()
  @IsEnum(Mode)
  mode: Mode;
}
