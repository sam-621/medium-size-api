import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { FollowUserDto } from '../dtos/actions.dto';
import { UserProfileResponse } from '../dtos/response.dto';
import { ActionsService } from '../services/actions.service';
import { AuthGuard } from '/@/common/guards/auth.guard';
import { ErrorHttpResponse, IUserRequest } from '/@/common/interfaces/network.interface';

@ApiTags('User actions')
@Controller('user/actions')
export class ActionsController {
  constructor(private actionsServices: ActionsService) {}

  @UseGuards(AuthGuard)
  @Put('follow')
  @ApiUnauthorizedResponse({ description: 'No token provided', type: ErrorHttpResponse })
  @ApiBadRequestResponse({ description: 'Follower id si not an id', type: ErrorHttpResponse })
  @ApiOkResponse({ description: 'follower added', type: UserProfileResponse })
  async followUser(
    @Req() req: IUserRequest,
    @Body() followUserDto: FollowUserDto,
  ): Promise<UserProfileResponse> {
    const userUpdated = await this.actionsServices.follow(
      req.user.id,
      followUserDto.followerId as unknown as Types.ObjectId,
    );

    return new UserProfileResponse(userUpdated);
  }
}
