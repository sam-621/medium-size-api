import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UserRepository } from '../repository/user.repository';
import { TPayload } from '/@/auth/interfaces/auth.interfaces';
import { AuthService } from '/@/auth/services/auth.service';

const DUPLICATED_EMAIL_ERROR = 'A user with that email already exists';

@Injectable()
export class UserAuthService {
  constructor(private authService: AuthService, private userRepository: UserRepository) {}

  async register(user: RegisterDto): Promise<string> {
    const userAlreadyExists = await this.emailAlreadyExists(user.email);

    if (userAlreadyExists) {
      throw new BadRequestException(DUPLICATED_EMAIL_ERROR);
    }

    const userToSave: RegisterDto = {
      ...user,
      password: await this.authService.hashPassword(user.password),
    };

    const newUser = await this.userRepository.saveUser(userToSave);

    const payload: TPayload = {
      id: newUser._id,
    };

    const token = this.authService.createJWT(payload);

    return token;
  }

  async login({ email, password }: LoginDto): Promise<string> {
    const userByEmail = await this.userRepository.findOneByEmail(email, ['password']);

    if (!userByEmail) throw new UnauthorizedException('Wrong credentials');

    const passwordsMatch = await this.authService.passwordsMatch(password, userByEmail.password);

    if (!passwordsMatch) throw new UnauthorizedException('Wrong credentials');

    const payload: TPayload = {
      id: userByEmail._id,
    };

    const token = this.authService.createJWT(payload);

    return token;
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneByEmail(email);

    return Boolean(user);
  }
}
