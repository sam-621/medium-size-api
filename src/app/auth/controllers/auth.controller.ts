import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { OkHttpResponse } from '/@/common/utils/OkHttpResponse.util';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBadRequestResponse({ description: 'User with that email already exists' })
  @ApiCreatedResponse({ description: 'user created', type: OkHttpResponse })
  async register(@Body() user: RegisterDto) {
    const token = await this.authService.register(user);

    return new OkHttpResponse<string>(token);
  }
}
