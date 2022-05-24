import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class ActionsService {
  constructor(private userRepository: UserRepository) {}

  async follow(userId: Types.ObjectId, followerId: Types.ObjectId) {
    try {
      const newUser = await this.userRepository.addFollower(userId, followerId);

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
