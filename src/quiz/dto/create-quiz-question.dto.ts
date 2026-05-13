import { IsArray, IsNotEmpty, IsString } from 'class-validator';

interface OptionsQuestion {
  key: string;
  value: string;
}

export class CreateQuizQuestionDto {
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  @IsArray()
  options: OptionsQuestion[];

  @IsNotEmpty()
  @IsString()
  correctAnswer: string;
}
