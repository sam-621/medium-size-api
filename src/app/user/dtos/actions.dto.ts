import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FollowUserDto {
  @ApiProperty()
  @IsString()
  followerId: string;
}
