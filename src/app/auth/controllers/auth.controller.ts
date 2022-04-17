import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../../user/dtos/login.dto';
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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Wrong credentials', type: ErrorHttpResponse })
  @ApiOkResponse({
    description: 'user logged successfully',
    type: AuthResponse,
  })
  async login(@Body() user: LoginDto) {
    const token = await this.authService.login(user);

    return new AuthResponse(token);
  }
}
