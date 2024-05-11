import { BadRequestException, Injectable } from '@nestjs/common'
import { Chapter } from './entities/chapter.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateChapterDto } from './dto/create.chapter.dto'
import { Category } from 'src/category/entities/category.entity'
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto'
import { UpdateChapterDto } from './dto/update.chapter.dto'

@Injectable()
export class ChapterService {
	constructor(
		@InjectRepository(Chapter)
		private readonly chapterRepository: Repository<Chapter>,
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>
	) {}

	async create(
		createChapterDto: CreateChapterDto,
		photoType: string,
		photoFileName: string | null
	): Promise<Chapter> {
		let photoPath: string | null = null

		if (photoType === 'link') {
			// Обработка случая, когда приходит ссылка на фото
			photoPath = createChapterDto.photo
		} else if (photoType === 'file' && photoFileName) {
			// Обработка случая, когда приходит файл с фото
			photoPath = `/uploads/${photoFileName}`
			
		}
		//@ts-ignore
		const chapter = this.chapterRepository.create({
			...createChapterDto,
			photo: photoPath ? [photoPath] : null // Используем массив, чтобы сохранить логику вашего кода
		})
		//@ts-ignore
		return this.chapterRepository.save(chapter)
	}

	async findAll() {
		const chapters = await this.chapterRepository.find()
		return chapters
	}

	async findOne(id: number) {
		try {
			const chapter = await this.chapterRepository.findOneBy({ id: id })
			console.log('chapter service by id', chapter)
			return chapter
		} catch (error) {
			console.error('Error in findOneBy service:', error)
			throw error
		}
	}

	async update(
		id: number,
		photoType: string,
		updateChapterDto: UpdateChapterDto,
		photoFileName: string | null
	): Promise<Chapter> {
		try {
			const chapter = await this.chapterRepository.findOneBy({ id: id })
			if (!chapter) {
				throw new Error('Раздел не найден') // Бросим ошибку, если раздел не найден
			}
			let photoPath: string | null = null

			if (photoType === 'link') {
				// Обработка случая, когда приходит ссылка на фото
				photoPath = updateChapterDto.photo
			} else if (photoType === 'file' && photoFileName) {
				// Обработка случая, когда приходит файл с фото
				photoPath = `/uploads/${photoFileName}`
			}
			// Обновим поля раздела
			chapter.name = updateChapterDto.name
			chapter.description = updateChapterDto.description
			chapter.photo = photoPath ? [photoPath] : null

			// Сохраним обновленный раздел
			return this.chapterRepository.save(chapter)
		} catch (error) {
			console.error('Error in findOneBy service:', error)
			throw error
		}
	}

	async deleteChapterById(id: number) {
		try {
			const chapter = await this.chapterRepository.findOneBy({ id: id })
			if (!chapter) {
				throw new Error('Раздел не найден')
			}
			return this.chapterRepository.delete({ id: id })
		} catch (error) {
			console.error('Error in findOneBy service:', error)
			throw error
		}
	}
}
