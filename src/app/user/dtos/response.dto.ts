import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';

export class UserAuthResponse {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

type TUserProfile = Omit<IUser, 'password'>;
export class UserProfileResponse {
  @ApiProperty()
  data: TUserProfile;

  constructor(data: TUserProfile) {
    this.data = data;
  }
}
