import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  reviewName: string;

  @Column()
  description: string;

  @Column('simple-array', { nullable: true })
  photo: string[];

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' }) // Укажите имя колонки для внешнего ключа, если оно отличается от "userId"
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
