import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { OkHttpResponse } from '/@/common/utils/OkHttpResponse.util';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: RegisterDto) {
    const token = await this.authService.register(user);

    return new OkHttpResponse<string>(token);
  }
}
