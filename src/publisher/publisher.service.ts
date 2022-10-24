import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher, PublisherDocument } from './entities/publisher.entity';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel(Publisher.name) public model: Model<PublisherDocument>,
  ) {}

  create(createUserDto: CreatePublisherDto) {
    return this.model.create(createUserDto);
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

  update(id: string, updateUserDto: UpdatePublisherDto) {
    return this.model.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
