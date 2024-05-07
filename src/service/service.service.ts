import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Service } from './service.entity'
import { Repository } from 'typeorm'
import { CreateServiceDto } from './dto/create.service.dto'

@Injectable()
export class ServicesService {
	constructor(
		@InjectRepository(Service)
		private readonly serviceRepository: Repository<Service>
	) {}

	async create(
		createServiceDto: CreateServiceDto,
		photoFileName: string
	): Promise<Service> {
		const service = this.serviceRepository.create({
			...createServiceDto,
			//@ts-ignore
			photo: [`/uploads/${photoFileName}`]
		})
		console.log('cthdbcreated', service)
		//@ts-ignore
		return await this.serviceRepository.save(service)
	}

	async findAll() {
		const categories = await this.serviceRepository.find()
		return categories
	}
}
