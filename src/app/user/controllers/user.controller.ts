import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserProfileResponse } from '../dtos/response.dto';
import { UpdateUserDto } from '../dtos/update.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '/@/common/guards/auth.guard';
import { IUserRequest } from '/@/common/interfaces/network.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('info')
  async getUser(@Req() req: IUserRequest): Promise<UserProfileResponse> {
    const user = await this.userService.getProfile(req.user.id);

    return new UserProfileResponse(user);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateUser(
    @Req() req: IUserRequest,
    @Body() user: UpdateUserDto,
  ): Promise<UserProfileResponse> {
    const userUpdated = await this.userService.updateProfile(req.user.id, user);

    return new UserProfileResponse(userUpdated);
  }
}
