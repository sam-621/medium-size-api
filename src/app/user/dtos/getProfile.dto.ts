import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export class GetUserProfileDto implements Omit<IUser, 'password'> {
  @ApiProperty({ type: String })
  id: Types.ObjectId;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  profilePic: string;

  @ApiProperty()
  followers: Types.ObjectId[];

  @ApiProperty()
  following: Types.ObjectId[];
}

export class GetProfileByIdParam {
  id: Types.ObjectId;
}
