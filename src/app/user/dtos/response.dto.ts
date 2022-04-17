import { ApiProperty } from '@nestjs/swagger';

export class UserAuthResponse {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
