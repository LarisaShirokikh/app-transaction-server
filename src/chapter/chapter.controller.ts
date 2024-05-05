import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create.chapter.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateChapterDto } from './dto/update.chapter.dto';
import { CategoryService } from 'src/category/category.service';

@Controller('chapter')
export class ChapterController {
  constructor(
    private readonly chapterService: ChapterService,
    private readonly categoryService: CategoryService,
  ) {}

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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteChapter(@Param('id') id: number) {
    try {
      const catalogs = await this.chapterService.findOne(id);
      if (catalogs) {
        return await this.chapterService.deleteChapterById(id);
      }
    } catch (error) {
      console.error('Error in findOne controller:', error);
      throw error;
    }
  }

  @Get()
  findAll(@Req() req) {
    return this.chapterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const catalogs = await this.chapterService.findOne(id);
      return catalogs;
    } catch (error) {
      console.error('Error in findOne controller:', error);
      throw error;
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Param('id') id: string,
    @UploadedFile() photo,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    try {
      return await this.chapterService.update(
        +id,
        photo ? 'file' : 'link',
        updateChapterDto,
        photo ? photo.filename : null,
      );
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  @Get('category/:chapterName')
  async findCatalogsByChapterId(@Param('chapterName') chapterName: string) {
    try {
      const catalogs = await this.categoryService.findByChapterName(
        chapterName,
      );
      return catalogs;
    } catch (error) {
      console.error('Error in findCatalogsByChapterId controller:', error);
      throw error;
    }
  }
}
