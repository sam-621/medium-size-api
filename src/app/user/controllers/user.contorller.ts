import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '/@/common/guards/auth.guard';
import { IUserRequest } from '/@/common/interfaces/network.interface';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard)
  @Get('info')
  getUser(@Req() req: IUserRequest) {
    console.log({
      user: req.user,
    });

    return {
      data: {
        username: 'test',
        email: 'test@test.com',
      },
    };
  }
}
