import { Prop, Schema } from '@nestjs/mongoose';


@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class BaseEntity {
  id: string;
  @Prop({ default: () => new Date() })
  createdAt: Date;
  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

