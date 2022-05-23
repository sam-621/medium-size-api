import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserProfileResponse } from '../dtos/response.dto';
import { UpdateUserDto } from '../dtos/update.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '/@/common/guards/auth.guard';
import { ErrorHttpResponse, IUserRequest } from '/@/common/interfaces/network.interface';

@ApiTags('User profile')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('info')
  @ApiUnauthorizedResponse({ description: 'No token provided', type: ErrorHttpResponse })
  @ApiOkResponse({ description: 'User details', type: UserProfileResponse })
  async getUser(@Req() req: IUserRequest): Promise<UserProfileResponse> {
    const user = await this.userService.getProfile(req.user.id);

    return new UserProfileResponse(user);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  @ApiUnauthorizedResponse({ description: 'No token provided', type: ErrorHttpResponse })
  @ApiBadRequestResponse({ description: 'That email is already taken', type: ErrorHttpResponse })
  @ApiOkResponse({ description: 'User updated', type: UserProfileResponse })
  async updateUser(
    @Req() req: IUserRequest,
    @Body() user: UpdateUserDto,
  ): Promise<UserProfileResponse> {
    const userUpdated = await this.userService.updateProfile(req.user.id, user);

    return new UserProfileResponse(userUpdated);
  }
}
