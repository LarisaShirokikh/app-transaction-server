import { CreateProductDto } from './dto/create-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { DeepPartial, Repository } from 'typeorm'
import { ProductCsv } from './type/csvType'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {}

	async create(
		createProductDto: CreateProductDto,
		photoType: string, // Добавляем параметр photoType
		photoFileName: string | null
	): Promise<Product> {
		let photoPath: string | null = null

		if (photoType === 'link') {
			//@ts-ignore
			photoPath = createProductDto.photo
		} else if (photoType === 'file' && photoFileName) {
			photoPath = `/uploads/${photoFileName}`
		}

		//@ts-ignore
		const newProduct = this.productRepository.create({
			...createProductDto,
			photo: photoPath ? [photoPath] : null
		})
		//@ts-ignore
		return await this.productRepository.save(newProduct)
	}

	async createMany(data: ProductCsv[]) {
		const newProducts = data.map(csvProduct => {
			const deepPartialProduct: DeepPartial<Product> = {}
			return this.productRepository.create(deepPartialProduct)
		})

		return await this.productRepository.save(newProducts)
	}

	async findAll() {
		return this.productRepository.find()
	}

	async findOne(id: number) {
		try {
			const product = this.productRepository.findOneBy({ id: +id })
			return product
		} catch (error) {
			console.error('Error in findOneBy service:', error)
			throw error
		}
	}

	async findByCatalogId(catalogId: number): Promise<Product[]> {
		return await this.productRepository.find({
			where: { category: { id: catalogId } }
		})
	}

	async findAllWithPagination(page: number, limit: number): Promise<Product[]> {
		const startIndex = (page - 1) * limit
		const endIndex = page * limit

		return await this.productRepository
			.createQueryBuilder('product')
			.orderBy('product.id', 'ASC')
			.skip(startIndex)
			.take(limit)
			.getMany()
	}
}
