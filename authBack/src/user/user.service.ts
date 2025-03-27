import { HttpException, Injectable } from '@nestjs/common';
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

    return this.loginUser(userDto);
  }

  signToken(
    userDto: { userId: string; password: string },
    isRefreshToken: boolean,
  ) {
    const payload = {
      ...userDto,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: 'tmp',
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  loginUser(userDto: { userId: string; password: string }) {
    return {
      accessToken: this.signToken(userDto, false),
      refreshToken: this.signToken(userDto, true),
    };
  }

  userSignOut() {
    return 'user sign out';
  }

  userRegister() {
    return 'user register';
  }
}
