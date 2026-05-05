import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizQuestionDto } from './create-quiz-question.dto';
import { IsOptional } from 'class-validator';

export class UpdateQuizQuestion {
  @IsOptional()
  score: number;

  @IsOptional()
  userAnswer: string;
}
