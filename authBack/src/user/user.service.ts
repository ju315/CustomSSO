import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';

import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignHistoryModel } from 'src/common/entity/signIn.entity';
import { Repository } from 'typeorm';

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

    return this.loginUser(userDto.userId);
  }

  signToken(userId: string, isRefreshToken: boolean, uuid?: string) {
    const payload = {
      userId,
      ...(uuid && { uuid }),
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      expiresIn: isRefreshToken ? 3600 : 10,
    });
  }

  loginUser(userId: string, uuid?: string) {
    return {
      accessToken: this.signToken(userId, false, uuid),
      refreshToken: this.signToken(userId, true, uuid),
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
      const token = this.loginUser(userDto.userId, newUuid);

      const exist = await this.signInHistory.findOne({
        where: { sessionId: newUuid },
      });

      console.log('exist? ', exist);

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
        secret: 'bjpark',
      });

      // 새로운 Access Token 발급
      const newAccessToken = this.signToken(
        decoded.userId,
        false,
        decoded.uuid,
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh Token이 유효하지 않습니다.');
    }
  }

  async updateSingInStateInDB(sessionId) {
    const value = await this.signInHistory.findOne({
      where: { sessionId, isSignIn: true },
    });

    const newValue = {
      ...value,
      isSignIn: false,
    };

    const res = await this.signInHistory.save(newValue);

    return res;
  }

  async getSingInState(sessionId: string) {
    const value = await this.signInHistory.findOne({
      where: { sessionId },
    });

    return value.isSignIn;
  }
}
