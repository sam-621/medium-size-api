import { ApiProperty } from '@nestjs/swagger';
import { TUserDocument } from '../schema/user.schema';
import { GetUserProfileDto } from './getProfile.dto';

export class UserAuthResponse {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

export class UserProfileResponse {
  @ApiProperty()
  data: GetUserProfileDto;

  constructor(data: TUserDocument) {
    const _data: GetUserProfileDto = {
      id: data._id,
      username: data.username,
      email: data.email,
      bio: data.bio,
      profilePic: data.profilePic,
      followers: data.followers,
      following: data.following,
    };

    this.data = _data;
  }
}

export class UnauthorizedException {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
