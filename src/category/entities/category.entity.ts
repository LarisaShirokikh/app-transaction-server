import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsBoolean()
  @Column({ type: 'boolean' })
  atHome: boolean;

  @IsBoolean()
  @Column({ type: 'boolean' })
  forOne: boolean;

  @IsBoolean()
  @Column({ type: 'boolean' })
  forLeftMenu: boolean;

  @IsBoolean()
  @Column({ type: 'boolean' })
  popular: boolean;

  @IsNumber({}, { message: 'Новая цена продукта должна быть числом' })
  @Column({ nullable: true })
  price: number;

  @Column('simple-array', { nullable: true })
  photo: string[];

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Product, (product) => product.category)
  @JoinColumn()
  product: Product[];

  @ManyToMany(() => Chapter, (chapter) => chapter.category)
  @JoinColumn()
  chapter: Chapter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
