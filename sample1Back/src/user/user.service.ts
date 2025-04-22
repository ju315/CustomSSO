import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom } from 'rxjs';
import * as uuid from 'uuid';
import { AxiosError } from 'axios';

import { SignInDto } from './dto/signIn.dto';
import { DUMMY_USER_LIST, UserData } from './dummy/user.dummy';
import { SIGN_IN_DATA } from 'src/common/type/type';

@Injectable()
export class UserService {
  private signInList = new Map();
  private logger = new Logger(UserService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async signInBase(data: SignInDto) {
    try {
      const user = this.validateBaseUser(data);

      this.addSignInUser(user);

      this.logger.debug(
        `Sign-in list:: ${JSON.stringify(Object.fromEntries(this.signInList))}`,
      );
      return user;
    } catch (err) {
      throw new UnauthorizedException('User is not exist');
    }
  }

  async signOut(sid: string) {
    const res = this.removeSignInUser(sid);
    return res;
  }

  async signInAuth(data: SignInDto) {
    try {
      const res = await firstValueFrom(
        this.httpService
          .post('/api/user/sign-in', {
            ...data,
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );

      return res.data;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('User is not exist');
    }
  }

  validateBaseUser(data: SignInDto) {
    if (data.signType === SIGN_IN_DATA.BASE) {
      const user = DUMMY_USER_LIST.find(
        (user: UserData) =>
          user.id === data.userId && user.password === data.password,
      );

      if (!user) {
        throw new UnauthorizedException('User is not exist');
      }
      const sessionId = uuid.v4();

      return { ...user, sessionId };
    }
  }

  checkUserSession(sid: string) {
    const res = this.signInList.get(sid);
    console.log(res);

    return res;
  }

  /**
   * signInList에 정보를 저장하는 메서드.
   * @param data
   * @returns
   */
  addSignInUser(user) {
    this.signInList.set(user.sessionId, user);
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
      `Current sign-in session list:: ${JSON.stringify(
        Object.fromEntries(this.signInList),
      )}`,
    );
  }
}
