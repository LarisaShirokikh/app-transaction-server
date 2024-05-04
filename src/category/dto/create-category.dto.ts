import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'Цена продукта должна быть числом' })
  price?: number;

  @IsString({ message: 'Неверный формат значения фото' })
  @IsOptional()
  photo?: string;

  @IsString({ message: 'Неверный формат значения описания' })
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'Каталог не может быть пустым' })
  @IsString()
  chapterName: string[];
}
