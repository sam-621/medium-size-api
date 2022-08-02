import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TUserDocument, User } from '../schema/user.schema';
import { Model, QueryOptions } from 'mongoose';
import { Types } from 'mongoose';
import { RegisterDto } from '../dtos/register.dto';
import { UpdateUserDto } from '../dtos/update.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<TUserDocument>) {}

  findOneById(id: Types.ObjectId, fields: string[] = [], options?: QueryOptions) {
    return this.userModel.findById(id, fields, options);
  }

  async saveUser(user: RegisterDto) {
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  findOneByEmail(email: string, fields?: string[]) {
    return this.userModel.findOne({ email: email }, fields);
  }

  update(id: Types.ObjectId, user: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async addFollower(id: Types.ObjectId, followerId: Types.ObjectId) {
    const user = await this.userModel.findById(id);
    const follower = await this.userModel.findById(followerId);

    console.log({
      user1: Boolean(user),
      user2: Boolean(follower),
    });

    const newUser: User = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      bio: user.bio,
      profilePic: user.profilePic,
      following: user.following,
      followers: [...user.followers, followerId],
    };

    const newFollowerData: User = {
      _id: follower._id,
      username: follower.username,
      email: follower.email,
      password: follower.password,
      bio: follower.bio,
      profilePic: follower.profilePic,
      followers: follower.followers,
      following: [...follower.following, id],
    };

    console.log({
      user1: newUser,
      user2: newFollowerData,
    });

    await this.userModel.findByIdAndUpdate(followerId, newFollowerData, { new: true });
    return this.userModel.findByIdAndUpdate(id, newUser, { new: true });
  }
}
