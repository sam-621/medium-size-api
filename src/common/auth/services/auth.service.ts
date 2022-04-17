import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TPayload } from '../interfaces/auth.interfaces';
import { SALT } from '/@/common/config/constants.config';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT);
  }

  async passwordsMatch(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  createJWT(payload: TPayload): string {
    return this.jwtService.sign(payload, { expiresIn: '3d' });
  }

  verifyJWT(token: string): TPayload {
    return this.jwtService.verify<TPayload>(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
