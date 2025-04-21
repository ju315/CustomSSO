import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { SESSION_COOKIE_NAME, SIGN_TYPE_COOKIE_NAME } from '../const';

@Injectable()
export class SignInGuard implements CanActivate {
  private logger = new Logger(SignInGuard.name);
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const sessionId = req.cookies[SESSION_COOKIE_NAME];
    const signType = req.cookies[SIGN_TYPE_COOKIE_NAME];

    const res = this.userService.checkUserSession(sessionId);

    if (res) {
      return true;
    }

    throw new UnauthorizedException('Already sign out sessionId!');
  }
}
