import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

import { AUTH_BACK } from 'src/common/const';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class UserService {
  private signInList = new Map();
  private logger = new Logger(UserService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto) {
    try {
      // const tokenValidate = await this.jwtService.verifyAsync(
      //   data.accessToken,
      //   {
      //     secret: 'SSO-PROJECT',
      //   },
      // );
      // console.log('token validate:: ', tokenValidate);

      this.addSignInUser(data);
    } catch (err) {
      throw new UnauthorizedException('toke is expired!');
    }
  }

  /**
   * signInList에 정보를 저장하는 메서드.
   * @param data
   * @returns
   */
  addSignInUser(data: SignInDto) {
    this.signInList.set(data.sessionId, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    const res = this.signInList.get(data.sessionId);

    this.logger.debug(`Sign-in list:: ${JSON.stringify(this.signInList)}`);
    this.logger.debug(`Save Sign-in list result:: ${JSON.stringify(res)}`);
  }

  async signOut(data: any) {
    const res = this.removeSignInUser(data);
    return res;
  }

  /**
   * signInList에서 sessionId에 해당하는 값을 삭제하는 메서드.
   * @param sessionId
   * @returns
   */
  async removeSignInUser(sessionId: string) {
    const signInData = this.signInList.has(sessionId);

    if (!signInData) {
      this.logger.debug('already sign out session.');

      return true;
    }

    this.signInList.delete(sessionId);

    this.logger.debug(
      `Current sign-in session list:: ${JSON.stringify(this.signInList)}`,
    );
  }

  async validateUser(data: any) {
    return null;
  }

  /**
   * sessionId가 로그아웃 되었는지 authBack에 요청하는 메서드.
   * @param sessionId
   * @returns
   */
  async checkSignInUser(sessionId: string) {
    const res = await firstValueFrom(
      this.httpService.get(
        `${AUTH_BACK}/api/v2/user/check-sign-in?s=${sessionId}`,
      ),
    );

    if (!res.data) {
      this.logger.debug('Sign out in Auth Server!');

      this.removeSignInUser(sessionId);
    }

    return res.data;
  }
}
