import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from '../../core/base/base.entity'
import { BOOK_CATEGORY } from '../constant/constant';

export type BookDocument = Book & mongoose.Document;

@Schema()
export class Book extends BaseEntity {
  @Prop({required: true})
  title: string;
  @Prop()
  subTitle: string;
  @Prop({required: true})
  author: string;
  @Prop({required: true})
  category: BOOK_CATEGORY;
  @Prop()
  borrowById: string;
  borrowBy: User;
  @Prop({required: true})
  publisherId: string;
  publisher: Publisher;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

BookSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

BookSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {  
    delete ret._id 
    return ret
  }
});

BookSchema.virtual("borrowBy", {
  ref: "User",
  localField: "borrowById",
  foreignField: "_id",
  justOne: true,
});
