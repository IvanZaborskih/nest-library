import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../book/entities/book.entity';
import { BookService } from '../book/services/book.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService, BookService],
})
export class UserModule {}