import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { Types } from 'mongoose';
import { TUserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getProfile(id: Types.ObjectId): Promise<TUserDocument> {
    const user = await this.userRepository.findOneById(id, [
      'username',
      'email',
      'bio',
      'profilePic',
    ]);

    return user;
  }
}
