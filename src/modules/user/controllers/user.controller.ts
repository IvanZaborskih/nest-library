import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from 'src/modules/book/services/book.service';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { BookIdDto, CreateDto, UpdateDto } from './dto';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly bookService: BookService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all users',
    type: [User]
  })
  getAllUsers(): Promise<User[]> {
    const users = this.userService.findAll();
    return users;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'get one user by id',
    type: User
  })
  @ApiResponse({
    status: 404,
    description: 'User with id = ${id} not exists'
  })
  async getOneUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id = ${id} not exists`);
    }

    return user;
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'post user',
    type: User
  })
  @ApiResponse({
    status: 400,
    description: 'User name is empty'
  })
  createUser(@Body() createDto: CreateDto): Promise<User> {
    const user = new User();
    if (!createDto.name) {
      throw new BadRequestException(`User name is empty!`);
    }
    user.name = createDto.name;
    if (createDto.hasSubscription) {
		  user.hasSubscription = createDto.hasSubscription;
    }

    return this.userService.create(user);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'put user',
    type: User
  })
  @ApiResponse({
    status: 404,
    description: 'User with id = ${id} not exists'
  })
  async updateUser(
    @Param('id') id: string, 
    @Body() {name, hasSubscription}: UpdateDto
  ): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id = ${id} not exists`);
    }
    user.name = name;
    user.hasSubscription = hasSubscription;
    return this.userService.update(user);
  }

  
  @Put(':id/addBook')
  @ApiResponse({
    status: 200,
    description: 'add book to user',
    type: User
  })
  @ApiResponse({
    status: 404,
    description: 'text message'
  })
  async addBookToUser(
    @Param('id') id: string, 
    @Body() { bookId }: BookIdDto 
  ): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id = ${id} not exists`);
    }

    if (!user.hasSubscription) {
      throw new NotFoundException('User does not have subscription, not allow to take a book');
    } else {
      if (user.books.length < 5) {
        const book = await this.bookService.findOne(bookId);
        if (!book) {
          throw new NotFoundException(`Book with id = ${bookId} not exists`);
        } else {
          if (book.isFree) {
            user.books.push(book);
            book.isFree = false;
            await this.bookService.update(book);
          } else {
            throw new NotFoundException('The book already taken');
          }
        }
      } else {
        throw new NotFoundException('oops can\'t take more than 5 books');
      }
      
    }

    return await this.userService.update(user);
  }

  @Put(':id/subscription')
  @ApiResponse({
    status: 200,
    description: 'buy subscription by user',
    type: User
  })
  @ApiResponse({
    status: 404,
    description: 'text message'
  })
  async buySubscription(
    @Param('id') id: string
  ): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id = ${id} not exists`);
    }
    if (!user.hasSubscription) {
      user.hasSubscription = true;
    } else {
      throw new NotFoundException('The subscription already bought');
    }
    
    return this.userService.update(user);
  }

  @Put(':id/returnBook')
  @ApiResponse({
    status: 200,
    description: 'return book from user',
    type: User
  })
  @ApiResponse({
    status: 404,
    description: 'text message'
  })
  async returnBookFromUser(
    @Param('id') id: string, 
    @Body() { bookId }: BookIdDto 
  ): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id = ${id} not exists`);
    }

    const book = await this.bookService.findOne(bookId);
    if (!book) {
      throw new NotFoundException(`Book with id = ${bookId} not exists`);
    } else {
      const bookWithUser = user.books.find(book => book.id === Number(bookId));

      if (bookWithUser) {
        let indexOfBook = user.books.indexOf(bookWithUser);
        user.books.splice(indexOfBook, 1);
        book.isFree = true;
        await this.bookService.update(book);
      } else {
        throw new NotFoundException('This book from another user or free');
      }
    }
    
    return await this.userService.update(user);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'delete user'
  })
  @ApiResponse({
    status: 404,
    description: 'User with id = ${id} not exists'
  })
  async deleteAction(@Param('id') id: string): Promise<{ message: string }> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id = ${id} not exists`);
    }

    await this.userService.remove(id);
    return { message: 'Delete success'};
  }
}
