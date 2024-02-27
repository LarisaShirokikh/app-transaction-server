import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChapterDto {
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'Неверный формат значения фото' })
  @IsOptional()
  photo?: string;

  @IsString({ message: 'Неверный формат значения описания' })
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'Каталог не может быть пустым' })
  @IsNumber({}, { message: 'Неверный формат значения категории' })
  category: number[];
}