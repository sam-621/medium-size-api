import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/register.dto';
import { AuthResponse } from '../dtos/response.dto';
import { AuthService } from '../services/auth.service';
import { ErrorHttpResponse } from '/@/common/interfaces/responses.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiBadRequestResponse({
    description: 'User already exists with that email',
    type: ErrorHttpResponse,
  })
  @ApiCreatedResponse({ description: 'user created', type: AuthResponse })
  async register(@Body() user: RegisterDto) {
    const token = await this.authService.register(user);

    return new AuthResponse(token);
  }
}
