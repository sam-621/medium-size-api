import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { IUserRequest } from '../interfaces/network.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IUserRequest>();

    const token = request.headers.authorization;

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const decoded = this.authService.verifyJWT(token);

      if (!decoded) throw new UnauthorizedException('Invalid token');

      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
