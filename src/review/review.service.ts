import { BadRequestException, Injectable } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/create.review.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    userId: number,
  ): Promise<Review> {
    const rating =
      typeof createReviewDto.rating === 'number' ? createReviewDto.rating : 0;
    const savedPhoto = await this.photoRepository.save({
      filename: createReviewDto.photos[0], // Предполагая, что у вас только одно фото
    });

    const review = this.reviewRepository.create({
      ...createReviewDto,
      rating,
      user: { id: userId },
      photo: [`/upload/${savedPhoto.filename}`],
    });
    console.log('Review before saving:', review);

    const savedReview = await this.reviewRepository.save(review);
    console.log('Saved review:', savedReview);

    return savedReview;
  }

  async findAll() {
    const reviews = await this.reviewRepository.find();
    return reviews;
  }

  async createPhoto(filename: string): Promise<Photo> {
    console.log('Creating photo:', { filename });
    const newPhoto = this.photoRepository.create({
      filename,
      photo: [`/uploads/${filename}`],
    });

    try {
      const savedPhoto = await this.photoRepository.save(newPhoto);
      console.log('Saved photo entity:', savedPhoto);
      return savedPhoto;
    } catch (error) {
      console.error('Error saving photo entity:', error);
      throw new BadRequestException(
        `Ошибка при сохранении фото: ${error.message}`,
      );
    }
  }
}
