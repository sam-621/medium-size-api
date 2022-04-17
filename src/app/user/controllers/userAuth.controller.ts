import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UserAuthResponse } from '../dtos/response.dto';
import { UserAuthService } from '../services/userAuth.service';
import { ErrorHttpResponse } from '/@/interfaces/responses.interface';

@ApiTags('User auth')
@Controller('user/auth')
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiBadRequestResponse({
    description: 'User already exists with that email',
    type: ErrorHttpResponse,
  })
  @ApiCreatedResponse({ description: 'user created', type: UserAuthResponse })
  async register(@Body() user: RegisterDto) {
    const token = await this.userAuthService.register(user);

    return new UserAuthResponse(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Wrong credentials', type: ErrorHttpResponse })
  @ApiOkResponse({
    description: 'user logged successfully',
    type: UserAuthResponse,
  })
  async login(@Body() user: LoginDto) {
    const token = await this.userAuthService.login(user);

    return new UserAuthResponse(token);
  }
}
