import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

import { UserRepository } from './user.repository';
import { SignHistoryModel } from 'src/common/entity/signIn.entity';
import { UserDataType } from './dummyData/user.dummy';

interface SessionUserDataType extends UserDataType {
  uuid?: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(SignHistoryModel)
    private signInHistory: Repository<SignHistoryModel>,
    private readonly jwtService: JwtService,
  ) {
    //
  }

  userSignIn(userDto: { userId: string; password: string }) {
    const user = this.userRepository.findUser(userDto);
    console.log(user);

    if (!user) {
      throw new HttpException('User is not exist!', 404);
    }

    return this.loginUser(user);
  }

  signToken(userData: UserDataType, isRefreshToken: boolean) {
    const payload = {
      ...userData,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      expiresIn: isRefreshToken ? 3600 : 10,
    });
  }

  loginUser(userData: SessionUserDataType) {
    return {
      accessToken: this.signToken(userData, false),
      refreshToken: this.signToken(userData, true),
    };
  }

  async userSignInV2(
    userDto: { userId: string; password: string },
    originIp: string,
  ) {
    const user = this.userRepository.findUser(userDto);

    if (!user) {
      throw new HttpException('User is not exist!', 404);
    }

    const newUuid = uuid.v4();

    try {
      const token = this.loginUser({ ...user, uuid: newUuid });

      await this.signInHistory.save({
        sessionId: newUuid,
        isSignIn: true,
        originIp,
      });

      return token;
    } catch (err) {
      console.error(err);

      throw new HttpException('sign in get error!', 400);
    }
  }

  userSignOut() {
    return 'user sign out';
  }

  userRegister() {
    return 'user register';
  }

  newAccessToken(refreshToken: string) {
    try {
      // Refresh Token 검증
      const decoded = this.jwtService.verify(refreshToken, {
        secret: 'SSO-PROJECT',
      });

      // 새로운 Access Token 발급
      const newAccessToken = this.signToken(decoded, false);

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new ForbiddenException('Refresh Token이 유효하지 않습니다.');
    }
  }

  async updateSingInStateInDB(sessionId) {
    try {
      const value = await this.signInHistory.findOne({
        where: { sessionId, isSignIn: true },
      });

      if (!value) {
        return true;
      }

      const newValue = {
        ...value,
        isSignIn: false,
      };

      const res = await this.signInHistory.save(newValue);

      return res;
    } catch (err) {
      console.log(err);
      throw new HttpException('something send wrong...', 400);
    }
  }

  async getSignInState(sessionId: string) {
    const value = await this.signInHistory.findOne({
      where: { sessionId },
    });

    return value.isSignIn;
  }
}
