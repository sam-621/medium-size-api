import { Types } from 'mongoose';

export interface IUser {
  id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePic: string;
}
