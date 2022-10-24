import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) public model: Model<BookDocument>,
  ) {}

  create(createUserDto: CreateBookDto) {
    return this.model.create(createUserDto);
  }

  borrowBook(id: string, user: User) {
    return this.model.findByIdAndUpdate(id, {borrowById: user.id}, {new: true}).populate('borrowBy');
  }

  async returnBook(id: string, user: User) {
    const book = await this.model.findByIdAndUpdate(id, {borrowById: null}, {new: true});
    return book
  }

  findAll() {
    return this.model.find()
  }

  findOne(id: string) {
    return this.model.findById(id)
  }

  findOneWithFilter(filter: any) {
    return this.model.findOne({...filter})
  }

  update(id: string, updateUserDto: UpdateBookDto) {
    return this.model.findByIdAndUpdate(id, updateUserDto, {new: true});
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
