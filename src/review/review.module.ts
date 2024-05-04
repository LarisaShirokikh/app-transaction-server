import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { User } from 'src/user/entities/user.entity';
import { Photo } from './entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Photo]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}

