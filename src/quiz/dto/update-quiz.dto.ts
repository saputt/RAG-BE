import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateQuizDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  finish: boolean;
}
