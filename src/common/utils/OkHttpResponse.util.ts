import { ApiProperty } from '@nestjs/swagger';

export class OkHttpResponse<T> {
  @ApiProperty()
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
