import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'
import { Chapter } from 'src/chapter/entities/chapter.entity'
import { Product } from 'src/product/entities/product.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@IsNumber({}, { message: 'Новая цена продукта должна быть числом' })
	@Column({ nullable: true })
	price: number

	@Column('simple-array', { nullable: true })
	photo: string[]

	@Column({ nullable: true })
	description: string

	@ManyToMany(() => Product, product => product.category)
	@JoinTable()
	product: Product[]

	@Column('simple-array')
	chapterName: string[]

	@ManyToMany(() => Chapter, chapter => chapter.category)
	chapter: Chapter[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
