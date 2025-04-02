import { Controller, Get, Query, Render, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('view')
export class ViewController {
  constructor(private readonly userService: UserService) {
    //
  }

  @Version('1')
  @Get('check')
  @Render('check')
  viewCheckCookie(
    @Query('returnUrl') returnUrl: string,
    @Query('v') version: string,
  ) {
    return { returnUrl, version };
  }

  @Version('1')
  @Get('sign-in')
  @Render('login')
  viewSignIn(
    @Query('returnUrl') returnUrl: string,
    @Query('v') version: string,
    @Req() req: Request,
  ) {
    return { returnUrl: decodeURIComponent(returnUrl), version };
  }

  @Version('1')
  @Get('sign-out')
  @Render('signOut')
  viewSignOut(@Query('returnUrl') returnUrl: string, @Req() req: Request) {
    return { returnUrl: decodeURIComponent(returnUrl) };
  }

  @Version('2')
  @Get('sign-out')
  @Render('signOut')
  async viewSignOutV2(
    @Query('returnUrl') returnUrl: string,
    @Query('s') sessionId: string,
  ) {
    console.log(sessionId);
    await this.userService.updateSingInStateInDB(sessionId);

    return { returnUrl: decodeURIComponent(returnUrl) };
  }
}
