import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';

export class ErrorHttpResponse {
  @ApiProperty()
  message: string;
}

export type IUserRequest = Request & {
  user: {
    id: Types.ObjectId;
  };
};
