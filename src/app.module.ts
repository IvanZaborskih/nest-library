import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';
  
@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
