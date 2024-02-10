import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, ProductService],
})
export class CategoryModule { }
