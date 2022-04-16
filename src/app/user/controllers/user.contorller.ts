import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('info')
  getUser() {
    return {
      data: {
        username: 'test',
        email: 'test@test.com',
      },
    };
  }
}
