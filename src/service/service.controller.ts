import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create.service.dto';
import { ServicesService } from './service.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Service } from './service.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async createService(
    @UploadedFile() photo,
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<Service> {
    console.log('create createServiceDto', createServiceDto);
    try {
      const service = await this.servicesService.create(
        createServiceDto,
        photo.filename,
      );
      return service;
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при создании сервиса: ${error.message}`,
      );
    }
  }

  @Get()
  findAll(@Req() req) {
    return this.servicesService.findAll();
  }
}
