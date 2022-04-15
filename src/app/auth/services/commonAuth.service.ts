import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user/repository/user.repository';
import bcrypt from 'bcrypt';
import { SALT } from '/@/common/config/constants.config';
import { TPayload } from '../interfaces/auth.interfaces';

@Injectable()
export class CommonAuth {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT);
  }

  async passwordsMatch(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneByEmail(email);

    return Boolean(user);
  }

  createJWT(payload: TPayload): string {
    return this.jwtService.sign(payload, { expiresIn: '3d' });
  }

  verifyJWT(token: string): TPayload {
    return this.jwtService.verify<TPayload>(token);
  }
}
