import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  title: string;

  @Column()
  briefReview: string;

  @Column('simple-array', { nullable: true })
  photo: string[];

  // Отношение между Review и User
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' }) // Укажите имя колонки для внешнего ключа, если оно отличается от "userId"
  user: User;
}
