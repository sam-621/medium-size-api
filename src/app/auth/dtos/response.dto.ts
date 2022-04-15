import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
