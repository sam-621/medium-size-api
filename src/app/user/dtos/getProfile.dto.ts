import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class GetUserProfileDto {
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
}

export class GetProfileByIdParam {
  id: Types.ObjectId;
}
