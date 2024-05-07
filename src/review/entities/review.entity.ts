import { Product } from 'src/product/entities/product.entity'
import { User } from 'src/user/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class Review {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	rating: number

	@Column()
	reviewName: string

	@Column()
	description: string

	@Column('simple-array', { nullable: true })
	photo: string[]

	@ManyToOne(() => User, user => user.reviews)
	@JoinColumn({ name: 'userId' }) // Укажите имя колонки для внешнего ключа, если оно отличается от "userId"
	user: User

	@ManyToOne(() => Product, product => product.reviews) // Указываем связь "многие к одному" с сущностью Product
	@JoinColumn({ name: 'productId' }) // Укажите имя колонки для внешнего ключа, если оно отличается от "productId"
	product: Product

	@Column()
	userId: number

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
