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
	Put
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Category } from './entities/category.entity'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('photo'))
	async create(
		@UploadedFile() photo,
		@Body() createCategoryDto: CreateCategoryDto
	): Promise<Category> {
		try {
			const savedCategory = await this.categoryService.createCategory(
				createCategoryDto,
				photo ? 'file' : 'link', // Определяем тип фото в зависимости от наличия файла
				photo ? photo.filename : null // Передаем имя файла, если есть
			)
			return savedCategory
		} catch (error) {
			throw new BadRequestException(
				`Ошибка при создании категории: ${error.message}`
			)
		}
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('photo'))
	update(
		@Param('id') id: number,
		@UploadedFile() photo,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		console.log('update', updateCategoryDto)
		try {
			const updated = this.categoryService.update(
				id,
				updateCategoryDto,
				photo ? 'file' : 'link', // Определяем тип фото в зависимости от наличия файла
				photo ? photo.filename : null
			)
			console.log('updated', updated)
			return updated
		} catch (error) {
			throw new BadRequestException(
				`Ошибка при обноалении категории: ${error.message}`
			)
		}
	}

	@Get()
	findAll(@Req() req) {
		return this.categoryService.findAll()
	}

	@Get(':index')
	findOne(@Param('index') index: string) {
		return this.categoryService.findIndex(index)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: number) {
		try {
			return this.categoryService.remove(id)
		} catch (error) {
			console.error('Error in findOne controller:', error)
			throw error
		}
	}

	// Добавляем метод, который будет возвращать каталоги по идентификатору главы
	@Get('chapter/:chapterName')
	async findBychapterName(@Param('chapterName') chapterName: string) {
		try {
			const catalogs = await this.categoryService.findByChapterName(chapterName)
			return catalogs
		} catch (error) {
			throw new BadRequestException(
				`Ошибка при получении каталогов: ${error.message}`
			)
		}
	}

	@Get('catalog/:catalogId')
	async findByCategoriesId(@Param('catalogId') catalogId: number) {
		try {
			const catalog = await this.categoryService.findOne(catalogId)
			return catalog
		} catch (error) {
			throw new BadRequestException(
				`Ошибка при получении каталогов: ${error.message}`
			)
		}
	}

	@Get('category/:newCatalogName')
	async findByCategoryName(@Param('newCatalogName') newCatalogName: string) {
		try {
			const catalog = await this.categoryService.findByName(newCatalogName)
			return catalog
		} catch (error) {
			throw new BadRequestException(
				`Ошибка при получении каталогов: ${error.message}`
			)
		}
	}

	@Get('categories/category')
	async wite(@Req() req) {
		try {
			const catalogs = await this.categoryService.findWite()
			return catalogs
		} catch (error) {
			throw new BadRequestException(
				`Ошибка при получении каталогов: ${error.message}`
			)
		}
	}
}
