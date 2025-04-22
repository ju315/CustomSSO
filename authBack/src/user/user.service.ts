import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

import { UserRepository } from './user.repository';
import { SignHistoryModel } from 'src/common/entity/signInHistory.entity';
import { UserDataType } from './dummyData/user.dummy';
import { SignInDto } from './dto/signIn.dto';
import {
  SIGN_TYPE,
  SignInSessionModel,
} from 'src/common/entity/signInSession.entity';
import { WebSignInSessionModel } from 'src/common/entity/webSession.entity';
import { SIGN_IN_DATA } from 'src/common/type';

interface SessionUserDataType extends UserDataType {
  uuid?: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(SignHistoryModel)
    private signInHistory: Repository<SignHistoryModel>,
    @InjectRepository(SignInSessionModel)
    private signSession: Repository<SignInSessionModel>,
    @InjectRepository(WebSignInSessionModel)
    private webSession: Repository<WebSignInSessionModel>,
  ) {
    //
  }

  async userSignIn(userDto: SignInDto) {
    const user = this.userRepository.findUser(userDto);
    console.log(user);

    if (!user) {
      throw new HttpException('User is not exist!', 404);
    }

    if (userDto.signType === SIGN_IN_DATA.SYSTEM) {
      const res = await this.signInNormalType(userDto, user);

      return res;
    }

    return true;
    // return this.loginUser(user);
  }

  async signInNormalType(userDto: SignInDto, user: UserDataType) {
    const signHistory = await this.signInHistory.save({
      is_success: true,
      log_msg: 'sign in success.',
      server_ip: '192.168.62.13',
      client_ip: '192.168.62.13',
    });

    console.log(signHistory);

    const signSession = await this.signSession.save({
      is_sign_in: true,
      type: SIGN_TYPE.NORMAL,
      client_ip: '192.168.62.13',
      sessionId: uuid.v4(),
      user_id: user.id,
      sign_history: signHistory,
    });

    console.log(signSession);

    const webSession = await this.webSession.save({
      is_sign_in: true,
      sign_session: signSession,
      server_ip: '192.168.62.13',
      sessionId: uuid.v4(),
    });

    console.log(webSession);

    return {
      ...user,
      signSessionId: signSession.sessionId,
      webSignSessionId: webSession.sessionId,
      signType: userDto.signType,
    };
  }

  signInSSOType(userDto: SignInDto) {}

  async checkUserSession(sid: string) {
    const webSession = await this.webSession.findOne({
      where: {
        sessionId: sid,
      },
      relations: ['sign_session'],
    });

    if (!webSession.is_sign_in || !webSession.sign_session.is_sign_in) {
      await this.webSession.save({
        ...webSession,
        is_sign_in: false,
      });
      await this.signSession.save({
        ...webSession.sign_session,
        is_sign_in: false,
      });

      return null;
    }

    return webSession;
  }
  // signToken(userData: UserDataType, isRefreshToken: boolean) {
  //   const payload = {
  //     ...userData,
  //     type: isRefreshToken ? 'refresh' : 'access',
  //   };

  //   return this.jwtService.sign(payload, {
  //     expiresIn: isRefreshToken ? 3600 : 10,
  //   });
  // }

  // loginUser(userData: SessionUserDataType) {
  //   return {
  //     accessToken: this.signToken(userData, false),
  //     refreshToken: this.signToken(userData, true),
  //   };
  // }

  // async userSignInV2(
  //   userDto: { userId: string; password: string },
  //   originIp: string,
  // ) {
  //   const user = this.userRepository.findUser(userDto);

  //   if (!user) {
  //     throw new HttpException('User is not exist!', 404);
  //   }

  //   const newUuid = uuid.v4();

  //   try {
  //     const token = this.loginUser({ ...user, uuid: newUuid });

  //     await this.signInHistory.save({
  //       sessionId: newUuid,
  //       isSignIn: true,
  //       originIp,
  //     });

  //     return token;
  //   } catch (err) {
  //     console.error(err);

  //     throw new HttpException('sign in get error!', 400);
  //   }
  // }

  // userSignOut() {
  //   return 'user sign out';
  // }

  // userRegister() {
  //   return 'user register';
  // }

  // newAccessToken(refreshToken: string) {
  //   try {
  //     // Refresh Token 검증
  //     const decoded = this.jwtService.verify(refreshToken, {
  //       secret: 'SSO-PROJECT',
  //     });

  //     // 새로운 Access Token 발급
  //     const newAccessToken = this.signToken(decoded, false);

  //     return { accessToken: newAccessToken };
  //   } catch (error) {
  //     throw new ForbiddenException('Refresh Token이 유효하지 않습니다.');
  //   }
  // }

  // async updateSingInStateInDB(sessionId) {
  //   try {
  //     const value = await this.signInHistory.findOne({
  //       where: { sessionId, isSignIn: true },
  //     });

  //     if (!value) {
  //       return true;
  //     }

  //     const newValue = {
  //       ...value,
  //       isSignIn: false,
  //     };

  //     const res = await this.signInHistory.save(newValue);

  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //     throw new HttpException('something send wrong...', 400);
  //   }
  // }

  // async getSignInState(sessionId: string) {
  //   const value = await this.signInHistory.findOne({
  //     where: { sessionId },
  //   });

  //   return value.isSignIn;
  // }
}
