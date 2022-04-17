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
}
