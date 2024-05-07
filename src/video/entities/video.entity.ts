import { User } from 'src/user/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class Video {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	filename: string

	@Column('simple-array', { nullable: true }) // Изменение типа поля на string[]
	video: string[]

	@Column({ nullable: true })
	userId: number

	@ManyToOne(() => User, user => user.videos)
	user: User

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: Date
}
