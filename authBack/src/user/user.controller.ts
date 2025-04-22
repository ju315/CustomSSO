import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  async userSignIn(@Body() data: SignInDto) {
    const res = await this.userService.userSignIn(data);

    return res;
  }

  @Post('sign-out')
  async userSignOut(@Body() data: any) {}

  @Post('check-session')
  async checkUserSession(@Body() data: { sid: string }) {
    const res = await this.userService.checkUserSession(data.sid);

    return res;
  }

  // @Version('1')
  // @Post('sign-in')
  // async userSignIn(
  //   @Body() userDto: { userId: string; password: string; returnUrl?: string },
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const token = this.userService.userSignIn(userDto);

  //   res.cookie('token', JSON.stringify(token), {
  //     httpOnly: false,
  //     secure: false,
  //   });

  //   if (userDto.returnUrl) {
  //     const redirectUrl =
  //       userDto.returnUrl +
  //       '?at=' +
  //       token.accessToken +
  //       '&rt=' +
  //       token.refreshToken;
  //     return res.redirect(redirectUrl);
  //   }

  //   return {
  //     success: true,
  //     data: token,
  //   };
  // }

  // @Version('2')
  // @Post('sign-in')
  // async userSignInV2(
  //   @Req() req: Request,
  //   @Body() userDto: { userId: string; password: string; returnUrl?: string },
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const token = await this.userService.userSignInV2(userDto, getRealIp(req));

  //   res.cookie('token', JSON.stringify(token), {
  //     httpOnly: false,
  //     secure: false,
  //   });

  //   if (userDto.returnUrl) {
  //     const redirectUrl =
  //       userDto.returnUrl +
  //       '?at=' +
  //       token.accessToken +
  //       '&rt=' +
  //       token.refreshToken;
  //     return res.redirect(redirectUrl);
  //   }

  //   return {
  //     success: true,
  //     data: token,
  //   };
  // }

  // @Version('2')
  // @Get('check-sign-in')
  // async checkSignInState(@Query('s') sessionId: string) {
  //   const res = await this.userService.getSignInState(sessionId);

  //   return res;
  // }

  // @Post('sign-out')
  // async userSignOut() {
  //   return this.userService.userSignOut();
  // }

  // @Post('register')
  // async userRegister() {
  //   return this.userService.userRegister();
  // }

  // @Version('1')
  // @UseGuards(AuthGuard)
  // @Post('validate')
  // async userValidate(@Req() req) {
  //   console.log(req.user);

  //   return req.user;
  // }

  // @Version('1')
  // @Post('new-token')
  // async getNewToken(@Headers('authorization') rawToken: string) {
  //   const splitToken = rawToken.split(' ');

  //   if (splitToken.length !== 2) {
  //     throw new UnauthorizedException('잘못된 토큰입니다!');
  //   }

  //   const refreshToken = splitToken[1];

  //   const token = await this.userService.newAccessToken(refreshToken);

  //   return token;
  // }
}
