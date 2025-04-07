import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { AUTH_BACK } from 'src/common/const';

@Injectable()
export class UserService {
  private signInList = new Map();

  constructor(private readonly httpService: HttpService) {}

  async signIn(data: any) {
    const exist = this.signInList.get(data.sessionId);
    console.log(exist);

    if (exist) {
      throw new Error('already exist session!');
    }

    const res = this.addSignInUser(data);
    return res;
  }

  /**
   * signInList에 정보를 저장하는 메서드.
   * @param data
   * @returns
   */
  async addSignInUser(data) {
    this.signInList.set(data.sessionId, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    console.log(this.signInList);

    const res = this.signInList.get(data.sessionId);
    return res;
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
      console.log('already sign out session.');

      return true;
    }

    this.signInList.delete(sessionId);
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
      console.log('Sign out in Auth Server!');

      this.removeSignInUser(sessionId);
    }

    return res.data;
  }
}
