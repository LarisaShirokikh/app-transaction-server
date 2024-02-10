import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ProductCsv } from './type/csvType';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    photoFileName: string,
  ): Promise<Product> {
    //@ts-ignore
    const newProduct = this.productRepository.create({
      ...createProductDto,
      // name: createProductDto.name,
      // newPrice: createProductDto.newPrice,
      // oldPrice: createProductDto.oldPrice,
      // isOnSale: createProductDto.isOnSale || false, // Default to false if not provided
      // isNew: createProductDto.isNew || false,
      // inStock: createProductDto.inStock || true, // Default to false if not provided
      // construction: createProductDto.construction,
      // sealingContours: createProductDto.sealingContours,
      // thicknessWeight: createProductDto.thicknessWeight,
      // weight: createProductDto.weight,
      // insulation: createProductDto.insulation,
      // mainLock: createProductDto.mainLock,
      // additionalLock: createProductDto.additionalLock,
      // exteriorFinish: createProductDto.exteriorFinish,
      // interiorFinish: createProductDto.interiorFinish,
      // hinges: createProductDto.hinges,
      // doorProtection: createProductDto.doorProtection,
      // description: createProductDto.description,
      // category: createProductDto.category,
      photo: [`/doorsPhoto/${photoFileName}`],
    });
    //@ts-ignore
    return await this.productRepository.save(newProduct);
  }

  async createMany(data: ProductCsv[]) {
    const newProducts = data.map((csvProduct) => {
      const deepPartialProduct: DeepPartial<Product> = {};
      return this.productRepository.create(deepPartialProduct);
    });

    return await this.productRepository.save(newProducts);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    try {
      const product = this.productRepository.findOneBy({ id: +id });
      return product;
    } catch (error) {
      console.error('Error in findOneBy service:', error);
      throw error;
    }
  }

  async findAllWithPagination(page: number, limit: number): Promise<Product[]> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return await this.productRepository
      .createQueryBuilder('product')
      .orderBy('product.id', 'ASC')
      .skip(startIndex)
      .take(limit)
      .getMany();
  }
  
  
}
