import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/repository/user.repository';
import { RegisterDto } from '../dtos/register.dto';
import { TPayload } from '../interfaces/auth.interfaces';
import { CommonAuthService } from './commonAuth.service';

const DUPLICATED_EMAIL_ERROR = 'A user with that email already exists';

@Injectable()
export class AuthService {
  constructor(
    private commonAuthService: CommonAuthService,
    private userRepository: UserRepository,
  ) {}

  async register(user: RegisterDto): Promise<string> {
    const userAlreadyExists = await this.commonAuthService.emailAlreadyExists(user.email);

    if (userAlreadyExists) {
      throw new BadRequestException(DUPLICATED_EMAIL_ERROR);
    }

    const userToSave: RegisterDto = {
      ...user,
      password: await this.commonAuthService.hashPassword(user.password),
    };

    const newUser = await this.userRepository.saveUser(userToSave);

    const payload: TPayload = {
      id: newUser._id,
    };

    const token = this.commonAuthService.createJWT(payload);

    return token;
  }
}
