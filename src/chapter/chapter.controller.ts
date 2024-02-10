import { BadRequestException, Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create.chapter.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @UploadedFile() photo,
    @Body() createChapterDto: CreateChapterDto,
  ) {
    try {
      const savedChapter = await this.chapterService.create(
        createChapterDto,
        photo ? 'file' : 'link', // Определяем тип фото в зависимости от наличия файла
        photo ? photo.filename : null,
      );

      return savedChapter;
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при создании раздела: ${error.message}`,
      );
    }
  }

  @Get()
  findAll(@Req() req) {
    return this.chapterService.findAll();
  }
}
