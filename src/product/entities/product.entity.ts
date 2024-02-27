import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Имя продукта не может быть пустым' })
  @IsString({ message: 'Имя продукта должно быть строкой' })
  @Column()
  name: string;

  @ManyToMany(() => Category, (category) => category.product)
  @JoinTable()
  category: Category[];

  @IsBoolean()
  @Column({ default: true })
  inStock: boolean;

  @IsOptional()
  @Column({ nullable: true })
  construction: string;

  @IsOptional()
  @Column({ nullable: true })
  sealingContours: string;

  @IsOptional()
  @Column({ nullable: true })
  thicknessWeight: string;

  @IsOptional()
  @Column({ nullable: true })
  weight: string;

  @IsOptional()
  @Column({ nullable: true })
  insulation: string;

  @IsOptional()
  @Column({ nullable: true })
  mainLock: string;

  @IsOptional()
  @Column({ nullable: true })
  additionalLock: string;

  @IsOptional()
  @Column({ nullable: true })
  exteriorFinish: string;

  @IsOptional()
  @Column({ nullable: true })
  interiorFinish: string;

  @IsOptional()
  @Column({ nullable: true })
  hinges: string;

  @IsOptional()
  @Column({ nullable: true })
  doorProtection: string;

  @IsOptional()
  @Column({ nullable: true })
  oldPrice: number;

  @IsNotEmpty({ message: 'Новая цена продукта не может быть пустой' })
  @IsNumber({}, { message: 'Новая цена продукта должна быть числом' })
  @Column()
  newPrice: number;

  @IsOptional()
  @Column({ default: false })
  isOnSale: boolean;

  @IsOptional()
  @Column({ default: false })
  isNew: boolean;

  @IsOptional()
  @Column({ nullable: true })
  description: string;

  @Column('simple-array', { nullable: true })
  photo: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
