import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsString({ message: 'Неверный формат значения описания' })
  @IsOptional()
  reviewName: string;

  @IsString({ message: 'Неверный формат значения описания' })
  @IsOptional()
  description?: string;

  @IsString({ message: 'Неверный формат значения фото' })
  @IsOptional()
  photo?: string[];
}
