import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ minimum: 6, required: true })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
