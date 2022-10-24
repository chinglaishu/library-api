import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ROLE } from 'src/core/constants/constants';
import { BaseEntity } from '../../core/base/base.entity'

export type UserDocument = User & mongoose.Document;

@Schema()
export class User extends BaseEntity {
  @Prop({unique: true, required: true})
  username: string;
  @Prop({required: true})
  password: string;
  @Prop({required: true})
  displayName: string;
  @Prop({required: true, default: ROLE.USER})
  role: ROLE;
  @Prop({default: 0})
  point: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

UserSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {  
    delete ret["password"]
    delete ret._id 
    return ret
  }
});
