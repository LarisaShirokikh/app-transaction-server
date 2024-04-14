import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ConfirmationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @ManyToOne(() => User, (user) => user.confirmationCodes)
  user: User;
}
