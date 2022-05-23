import { ApiProperty } from '@nestjs/swagger';
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

  constructor(data: GetUserProfileDto) {
    this.data = data;
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
