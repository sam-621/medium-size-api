import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { Types } from 'mongoose';
import { TUserDocument } from '../schema/user.schema';
import { UpdateUserDto } from '../dtos/update.dto';

@Injectable()
export class ProfileService {
  constructor(private userRepository: UserRepository) {}

  async getProfileById(id: Types.ObjectId): Promise<TUserDocument> {
    try {
      const user = await this.userRepository.findOneById(id, [
        'username',
        'email',
        'bio',
        'profilePic',
      ]);

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateProfile(id: Types.ObjectId, user: UpdateUserDto) {
    const realUser = await this.userRepository.findOneById(id);
    const userWithThatEmail = await this.userRepository.findOneByEmail(user.email);

    if (Boolean(userWithThatEmail) && realUser.email !== userWithThatEmail?.email) {
      throw new BadRequestException('User with that email already exists');
    }

    const userUpdated = await this.userRepository.update(id, user);

    return userUpdated;
  }
}
