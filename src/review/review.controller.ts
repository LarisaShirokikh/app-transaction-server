import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create.review.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body()
    createReviewDto: CreateReviewDto,
    @Req() req,
  ) {
    console.log('Received createReviewDto:', createReviewDto);
    // Получаем текущего пользователя из запроса
    const user = req.user;
    // Вызываем сервис для создания отзыва
    return this.reviewService.create(createReviewDto, user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.reviewService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(@UploadedFile() photo, @Body() body, @Request() req) {
    console.log('Received photo:', photo);
    console.log('Received body:', body);
    try {
      const filename = photo.filename;
      const savedPhoto = await this.reviewService.createPhoto(filename);
      return {
        success: true,
        data: savedPhoto,
        message: 'Photo created successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при создании фото: ${error.message}`,
      );
    }
  }
}