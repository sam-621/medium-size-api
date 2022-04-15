import { ApiProperty } from '@nestjs/swagger';

export class ErrorHttpResponse {
  @ApiProperty()
  message: string;
}
