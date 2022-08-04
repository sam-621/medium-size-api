import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TUserDocument, User } from '../schema/user.schema';
import { Model, QueryOptions } from 'mongoose';
import { Types } from 'mongoose';
import { RegisterDto } from '../dtos/register.dto';
import { UpdateUserDto } from '../dtos/update.dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<TUserDocument>) {}

  findOneById(id: Types.ObjectId, fields: string[] = [], options?: QueryOptions) {
    return this.userModel.findById(id, fields, options).exec();
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

  async addFollower(id: Types.ObjectId, userToFollowId: Types.ObjectId) {
    const user = await this.userModel.findById(id);
    const userToFollow = await this.userModel.findById(userToFollowId);

    const newUser: User = this.formatUser(user);
    const newFollowerData: User = this.formatUser(userToFollow);

    await this.userModel.findByIdAndUpdate(userToFollow, newFollowerData, { new: true });
    return this.userModel.findByIdAndUpdate(id, newUser, { new: true });
  }

  private formatUser(user: TUserDocument): IUser {
    return {
      username: user.username,
      email: user.email,
      password: user.password,
      bio: user.bio,
      profilePic: user.profilePic,
      followers: user.followers,
      following: user.following,
    };
  }
}
