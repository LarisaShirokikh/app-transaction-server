import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Название продукта не может быть пустым' })
  @IsString({ message: 'Название продукта должно быть строкой' })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'Цена продукта должна быть числом' })
  oldPrice?: number;

  @IsNotEmpty({ message: 'Цена продукта не может быть пустой' })
  @IsNumber({}, { message: 'Цена продукта должна быть числом' })
  newPrice: number;

  @IsBoolean({ message: 'Неверный формат значения в наличии' })
  @IsOptional()
  isOnSale?: boolean;

  @IsBoolean({ message: 'Неверный формат значения в наличии' })
  @IsOptional()
  isNew?: boolean;

  @IsBoolean({ message: 'Неверный формат значения в наличии' })
  @IsOptional()
  inStock?: boolean;

  @IsString({ message: 'Неверный формат значения конструкции' })
  @IsOptional()
  construction?: string;

  @IsString({ message: 'Неверный формат значения контуров уплотнения' })
  @IsOptional()
  sealingContours?: string;

  @IsString({ message: 'Неверный формат значения толщины' })
  @IsOptional()
  thicknessWeight?: string;

  @IsString({ message: 'Неверный формат значения веса' })
  @IsOptional()
  weight?: string;

  @IsString({ message: 'Неверный формат значения утепления' })
  @IsOptional()
  insulation?: string;

  @IsString({ message: 'Неверный формат значения основного замка' })
  @IsOptional()
  mainLock?: string;

  @IsString({ message: 'Неверный формат значения дополнительного замка' })
  @IsOptional()
  additionalLock?: string;

  @IsString({ message: 'Неверный формат значения отделки снаружи' })
  @IsOptional()
  exteriorFinish?: string;

  @IsString({ message: 'Неверный формат значения отделки внутри' })
  @IsOptional()
  interiorFinish?: string;

  @IsString({ message: 'Неверный формат значения петель' })
  @IsOptional()
  hinges?: string;

  @IsString({ message: 'Неверный формат значения защиты от снятия полотна' })
  @IsOptional()
  doorProtection?: string;

  @IsString({ message: 'Неверный формат значения описания' })
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'Каталог не может быть пустым' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: 'Неверный формат значения каталога' },
  )
  category: number;

  @IsString({ message: 'Неверный формат значения фото' })
  @IsOptional()
  photo?: File;
}
