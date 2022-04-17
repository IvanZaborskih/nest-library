import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['user']
    });
  }

  findOne(id: string): Promise<Book> {
    return this.bookRepository.findOne(id, {
      relations: ['user']
    });
  }

  create(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  update(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}