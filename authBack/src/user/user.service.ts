import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
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

  signToken(userId: string, isRefreshToken: boolean) {
    const payload = {
      userId,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      expiresIn: isRefreshToken ? 3600 : 10,
    });
  }

  loginUser(userId: string) {
    return {
      accessToken: this.signToken(userId, false),
      refreshToken: this.signToken(userId, true),
    };
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
      const newAccessToken = this.signToken(decoded.userId, false);

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh Token이 유효하지 않습니다.');
    }
  }
}
