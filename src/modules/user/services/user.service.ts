import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['books']
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id, {
      relations: ['books']
    });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}