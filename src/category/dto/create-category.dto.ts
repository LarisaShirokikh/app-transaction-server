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

  @IsBoolean()
  popular?: boolean;

  @IsString({ message: 'Неверный формат значения фото' })
  @IsOptional()
  photo?: string;

  @IsBoolean()
  @IsOptional()
  isHome?: boolean;

  @IsBoolean()
  @IsOptional()
  forOne?: boolean;

  @IsBoolean()
  @IsOptional()
  forLeftMenu?: boolean;

  @IsString({ message: 'Неверный формат значения описания' })
  @IsOptional()
  description?: string;
}
