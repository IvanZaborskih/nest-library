import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/modules/book/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
 
@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: false })
  hasSubscription: boolean;
 
  @OneToMany(() => Book, book => book.user, {
	  onDelete: 'CASCADE', onUpdate: 'CASCADE'
  })
  books: Book[];

}