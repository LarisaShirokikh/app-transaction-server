import { BadRequestException, Injectable } from '@nestjs/common'
import { Review } from './entities/review.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateReviewDto } from './dto/create.review.dto'
import { Photo } from './entities/photo.entity'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(Review)
		private readonly reviewRepository: Repository<Review>,
		@InjectRepository(Photo)
		private readonly photoRepository: Repository<Photo>
	) {}

	async create(
		createReviewDto: CreateReviewDto,
		userId: number,
		photoType: string,
		photoFileName: string | null
	): Promise<Review> {
		let photoPath: string | null = null

		if (photoType === 'file' && photoFileName) {
			photoPath = `/uploads/${photoFileName}`
		}

		const review = this.reviewRepository.create({
			...createReviewDto,
			userId: userId,
			photo: photoPath ? [photoPath] : null
		})
		console.log('Review before saving:', review)
		return await this.reviewRepository.save(review)
	}

	async findAll() {
		const reviews = await this.reviewRepository.find()
		return reviews
	}

	async createPhoto(filename: string): Promise<Photo> {
		console.log('Creating photo:', { filename })
		const newPhoto = this.photoRepository.create({
			filename,
			photo: [`/uploads/${filename}`]
		})

		try {
			const savedPhoto = await this.photoRepository.save(newPhoto)
			console.log('Saved photo entity:', savedPhoto)
			return savedPhoto
		} catch (error) {
			console.error('Error saving photo entity:', error)
			throw new BadRequestException(
				`Ошибка при сохранении фото: ${error.message}`
			)
		}
	}
}
