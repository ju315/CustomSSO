import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private signInList = new Map();

  constructor() {
    //
  }

  async signIn(data: any) {
    const exist = this.signInList.get(data.sessionId);
    console.log(exist);

    if (exist) {
      throw new Error('already exist session!');
    }

    const res = this.addSignInUser(data);
    return res;
  }

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

  async removeSignInUser(data: any) {
    return null;
  }

  async validateUser(data: any) {
    return null;
  }
}
