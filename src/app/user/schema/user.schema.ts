import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { TMongoId } from '/@/common/interfaces/utils.interface';

export type TUserDocument = User & Document;

@Schema()
export class User implements IUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: TMongoId;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
