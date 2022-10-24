import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseEntity } from '../../core/base/base.entity'

export type PublisherDocument = Publisher & mongoose.Document;

@Schema()
export class Publisher extends BaseEntity {
  @Prop({required: true})
  name: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);

PublisherSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

PublisherSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

PublisherSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {  
    delete ret._id 
    return ret
  }
});
