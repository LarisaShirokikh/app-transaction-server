import { Injectable } from '@nestjs/common';
import { Chapter } from './entities/chapter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChapterDto } from './dto/create.chapter.dto';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}

  async create(
    createChapterDto: CreateChapterDto,
    photoType: string,
    photoFileName: string | null,
  ): Promise<Chapter> {
    let photoPath: string | null = null;

    if (photoType === 'link') {
      // Обработка случая, когда приходит ссылка на фото
      photoPath = createChapterDto.photo;
    } else if (photoType === 'file' && photoFileName) {
      // Обработка случая, когда приходит файл с фото
      photoPath = `/uploads/${photoFileName}`;
    }

    const chapter = this.chapterRepository.create({
      ...createChapterDto,
      photo: photoPath ? [photoPath] : null, // Используем массив, чтобы сохранить логику вашего кода
    });

    return this.chapterRepository.save(chapter);
  }

  async findAll() {
    const chapters = await this.chapterRepository.find();
    return chapters;
  }
}
