import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignInGuard } from 'src/common/guard/signIn.guard';
import { SESSION_COOKIE_NAME, USER_COOKIE_NAME } from 'src/common/const';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Post('/sign-in')
  async userSignIn(@Body() body: SignInDto, @Res() res: Response) {
    const result = await this.userService.signInBase(body);

    res.cookie(USER_COOKIE_NAME, JSON.stringify(result));
    res.cookie(SESSION_COOKIE_NAME, result.sessionId);

    return res.status(200).send(result);
  }

  @Version('1')
  @UseGuards(SignInGuard)
  @Post('/sign-out')
  async userSignOut(@Body() data: { sid: string }, @Res() res: Response) {
    await this.userService.signOut(data.sid);

    res.clearCookie(SESSION_COOKIE_NAME);
    res.clearCookie(USER_COOKIE_NAME);

    return res.status(200).send({ res: true });
  }

  @UseGuards(SignInGuard)
  @Post('/test')
  userTest() {
    return { data: 'ok' };
  }

  @Version('2')
  @Post('sign-in')
  async userSignInV2(@Body() body: SignInDto, @Res() res: Response) {
    const result = await this.userService.signInAuth(body);

    res.cookie(USER_COOKIE_NAME, JSON.stringify(result));
    res.cookie(SESSION_COOKIE_NAME, result.webSignSessionId);

    return res.status(200).send(result);
  }

  @Version('2')
  @Post('sign-out')
  async userSignOutV2(@Req() req: Request, @Res() res: Response) {
    const sid = req.cookies[SESSION_COOKIE_NAME];
    const result = await this.userService.singOutAuth(sid);

    res.clearCookie(SESSION_COOKIE_NAME);
    res.clearCookie(USER_COOKIE_NAME);

    return res.status(200).send(result);
  }
}
