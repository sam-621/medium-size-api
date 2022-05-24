import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { Types } from 'mongoose';

export type TUserDocument = User & Document;

@Schema()
export class User implements IUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: '' })
  bio: string;

  @Prop({ required: false, default: '' })
  profilePic: string;

  @Prop({ required: false, default: [] })
  followers: Types.ObjectId[];

  @Prop({ required: false, default: [] })
  following: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
