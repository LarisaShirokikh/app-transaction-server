import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductService } from './product.service';
import { ProductCsv } from './type/csvType';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @UploadedFile() photo,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    try {
      const savedProduct = await this.productService.create(
        createProductDto,
        photo ? 'file' : 'link', // Определяем тип фото в зависимости от наличия файла
        photo ? photo.filename : null,
      );

      return savedProduct;
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при создании категории: ${error.message}`,
      );
    }
  }

  @Post('createMany')
  @UseGuards(JwtAuthGuard)
  createMany(@Body() data: ProductCsv[], @Req() req) {
    return this.productService.createMany(data);
  }

  // @Get(':type/find')
  // @UseGuards(JwtAuthGuard)
  // findAllByType(@Req() req, @Param('type') type: string) {
  //   return this.productService.findAllByType(+req.user.id, type);
  // }

  @Get('pagination')
  findAllWithPagination(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productService.findAllWithPagination(
      // +req.user.id,
      +page,
      +limit,
    );
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      const product = this.productService.findOne(+id);
      return product;
    } catch (error) {
      console.error('Error in findOne controller:', error);
      throw error;
    }
  }

  @Get(':catalogId')
  async findByCatalogId(@Param('catalogId') catalogId: number) {
    try {
      const products = await this.productService.findByCatalogId(catalogId);
      return products;
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при получении продуктов: ${error.message}`,
      );
    }
  }

  // @Patch(':type/:id')
  // @UseGuards(JwtAuthGuard, AuthorGuard)
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.productService.update(+id, updateTransactionDto);
  // }

  // @Delete(':type/:id')
  // @UseGuards(JwtAuthGuard, AuthorGuard)
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
