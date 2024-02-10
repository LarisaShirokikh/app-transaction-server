// src/services/dto/create-service.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  serviceName: string;

  @IsString()
  shotDesc: string;

  @IsString()
  serviceCon: string;

  @IsString()
  price: string;

  @IsString()
  decor: string;

  @IsString()
  decorDesc: string;

  @IsOptional()
  photo?: File;

  // Добавьте другие поля по необходимости
}

