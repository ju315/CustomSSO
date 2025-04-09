import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';

@Injectable()
export class SignInGuard implements CanActivate {
  private logger = new Logger(SignInGuard.name);
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const sessionId = req.cookies['SSO_PROJECT.sid'];

    const res = await this.userService.checkSignInUser(sessionId);

    this.logger.debug(`Check Sign-in state:: ${res}`);

    if (res) {
      return true;
    }

    throw new UnauthorizedException('Already sign out sessionId!');
  }
}
