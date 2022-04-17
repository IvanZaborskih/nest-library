import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';
import { BookService } from '../services/book.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@ApiTags('book')
@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all books',
    type: [Book]
  })
  getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'get one book by id',
    type: Book
  })
  @ApiResponse({
    status: 404,
    description: 'Book with id = ${id} not exists'
  })
  async getOneBook(@Param('id') id: string): Promise<Book> {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id = ${id} not exists`);
    }

    return book;
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'post book',
    type: Book
  })
  @ApiResponse({
    status: 400,
    description: 'Book name is empty'
  })
  createBook(@Body() createDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    if (!createDto.name) {
      throw new BadRequestException(`Book name is empty!`);
    }
    book.name = createDto.name;

    return this.bookService.create(book);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'delete book'
  })
  @ApiResponse({
    status: 404,
    description: 'Book with id = ${id} not exists'
  })
  async deleteBook(@Param('id') id: string): Promise<{ message: string }> {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id = ${id} not exists`);
    }

    await this.bookService.remove(id);
    return { message: 'Delete success'};
  }
}
