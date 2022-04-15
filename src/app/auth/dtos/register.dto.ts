import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { TRegisterUser } from '../../user/interfaces/user.interface';

export class RegisterDto implements TRegisterUser {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minimum: 6 })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}

export class RegisterResponse {
  @ApiProperty()
  data: string;
}
