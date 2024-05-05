// user.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConfirmationCode } from './confirmation-code.entity';
import { Video } from 'src/video/entities/video.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isSuperAdmin: boolean;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(
    () => ConfirmationCode,
    (confirmationCode) => confirmationCode.user,
  )
  confirmationCodes: ConfirmationCode[]; // Отношение с ConfirmationCode

  @Column('simple-array', { nullable: true })
  reviewId: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
