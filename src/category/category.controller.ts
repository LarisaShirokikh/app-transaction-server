import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @UploadedFile() photo,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    console.log('create category', createCategoryDto);
    try {
      const savedCategory = await this.categoryService.createCategory(
        createCategoryDto,
        photo ? 'file' : 'link', // Определяем тип фото в зависимости от наличия файла
        photo ? photo.filename : null, // Передаем имя файла, если есть
      );
      return savedCategory;
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при создании категории: ${error.message}`,
      );
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id') id: string,
    @UploadedFile() photo,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto, photo.filename);
  }

  @Get()
  findAll(@Req() req) {
    return this.categoryService.findAll();
  }

  @Get(':index')
  findOne(@Param('index') index: string) {
    return this.categoryService.findIndex(index);
  }

  @Get(':le')
  getCatalogsForLeftMenu(@Req() req) {
    console.log('Request received:', req);
    return this.categoryService.getCatalogsForLeftMenu();
  }

  
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
