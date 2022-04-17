import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: true })
  isFree: boolean;

  @ManyToOne(() => User, user => user.books)
  user: User;
}