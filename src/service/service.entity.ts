import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class Service {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	serviceName: string

	@Column()
	shotDesc: string

	@Column()
	serviceCon: string

	@Column()
	price: string

	@Column()
	decor: string

	@Column()
	decorDesc: string

	@Column('simple-array', { nullable: true })
	photo: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	// Добавьте другие поля по необходимости
}
