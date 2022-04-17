import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserProfileResponse } from '../dtos/response.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '/@/common/guards/auth.guard';
import { IUserRequest } from '/@/common/interfaces/network.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('info')
  async getUser(@Req() req: IUserRequest) {
    const user = await this.userService.getProfile(req.user.id);

    return new UserProfileResponse(user);
  }
}
