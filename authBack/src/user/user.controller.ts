import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { AuthGuard } from 'src/common/token.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  async userSignIn(
    @Body() userDto: { userId: string; password: string; returnUrl?: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('body data::', userDto);
    const token = this.userService.userSignIn(userDto);
    console.log(token);

    res.cookie('token', JSON.stringify(token), {
      httpOnly: false,
      secure: false,
    });

    if (userDto.returnUrl) {
      const redirectUrl =
        userDto.returnUrl +
        '?accessToken=' +
        token.accessToken +
        '&refreshToken=' +
        token.refreshToken;
      return res.redirect(redirectUrl);
    }

    return {
      success: true,
      data: token,
    };
  }

  @Post('sign-out')
  async userSignOut() {
    return this.userService.userSignOut();
  }

  @Post('register')
  async userRegister() {
    return this.userService.userRegister();
  }

  @UseGuards(AuthGuard)
  @Post('validate')
  async userValidate(@Req() req) {
    console.log(req.user);

    return req.user;
  }
}
