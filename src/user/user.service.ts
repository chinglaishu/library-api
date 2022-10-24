import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseEntity } from 'src/core/base/base.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) public model: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.model.create(createUserDto);
  }

  async rewardReturnBook(user: User) {
    user.point += 5;
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.model.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
