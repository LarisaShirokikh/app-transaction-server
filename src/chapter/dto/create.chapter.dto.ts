import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChapterDto {
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'Неверный формат значения фото' })
  @IsOptional()
  photo?: string;

  @IsString({ message: 'Неверный формат значения описания' })
  @IsOptional()
  description?: string;
}