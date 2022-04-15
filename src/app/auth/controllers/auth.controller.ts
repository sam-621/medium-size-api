import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() user: RegisterDto) {
    return {
      data: user,
    };
  }
}
