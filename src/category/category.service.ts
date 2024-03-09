import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, In, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    photoType: string, // Добавляем параметр photoType
    photoFileName: string | null, // Модифицируем тип параметра
  ): Promise<Category> {
    let photoPath: string | null = null;

    if (photoType === 'link') {
      // Обработка случая, когда приходит ссылка на фото
      photoPath = createCategoryDto.photo;
    } else if (photoType === 'file' && photoFileName) {
      // Обработка случая, когда приходит файл с фото
      photoPath = `/uploads/${photoFileName}`;
    }
    //@ts-ignore
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      photo: photoPath ? [photoPath] : null,
      chapter: createCategoryDto.chapterId, // Убедитесь, что chapter имеет правильный тип
    });
    //@ts-ignore
    return this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findIndex(index: string) {
    let whereCondition: object = {};

    const categories = await this.categoryRepository.find({
      where: whereCondition,
    });

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Категории не найдены');
    }

    return categories;
  }

  // async findPopulyar() {
  //   const categories = await this.categoryRepository.find({
  //     where: { popular: true },
  //   });
  //   return categories;
  // }

  async findWite() {
    const whiteDoorsCatalogs = await this.categoryRepository.find({
      where: { chapter: { id: 1 } },
    });

    return whiteDoorsCatalogs;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    photoFileName: string,
  ) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException('Категория не найдена');
    //@ts-ignore
    return await this.categoryRepository.update(id, {
      ...updateCategoryDto,
      photo: [`/uploads/${photoFileName}`],
    });
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException('Категория не найдена');
    await this.categoryRepository.delete(id);

    return { message: 'Категория успешно удалена' };
  }

  async findByChapterId(chapterId: number[]): Promise<Category[]> {
    try {
      const catalogs = await this.categoryRepository
        .createQueryBuilder('category')
        .where(`category.chapterId LIKE :chapterId`, {
          chapterId: `%${chapterId}%`,
        })
        .getMany();
      return catalogs;
    } catch (error) {
      console.error('Error in findByChapterId service:', error);
      throw error;
    }
  }

  async findByCatalogId(catalogId: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id: catalogId },
    });
  }

  async findOne(id: number) {
    try {
      const chapter = this.categoryRepository.findOneBy({ id: +id });
      return chapter;
    } catch (error) {
      console.error('Error in findOneBy service:', error);
      throw error;
    }
  }
}
