import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  profilePic: string;
}
