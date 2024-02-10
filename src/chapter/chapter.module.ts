import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { Chapter } from './entities/chapter.entity';
import { Category } from 'src/category/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryService } from 'src/category/category.service';
import { ChapterController } from './chapter.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Chapter]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ChapterController],
  providers: [ChapterService, CategoryService]
})
export class ChapterModule {}
