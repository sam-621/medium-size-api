import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRepository } from '../repository/user.repository';
import { TUserDocument } from '../schema/user.schema';

@Injectable()
export class ActionsService {
  constructor(private userRepository: UserRepository) {}

  async follow(userId: Types.ObjectId, userToFollowId: Types.ObjectId): Promise<TUserDocument> {
    try {
      const newUser = await this.userRepository.addFollower(userId, userToFollowId);

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
