import { Controller, Get, Query, Render, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('view')
export class ViewController {
  constructor(private readonly userService: UserService) {
    //
  }

  // @Version('1')
  // @Get('check')
  // @Render('check')
  // viewCheckCookie(@Query('r') r: string, @Query('v') v: string) {
  //   return { r, v };
  // }

  // @Version('1')
  // @Get('sign-in')
  // @Render('login')
  // viewSignIn(@Query('r') r: string, @Query('v') v: string) {
  //   return { r: decodeURIComponent(r), v };
  // }

  // @Version('1')
  // @Get('sign-out')
  // @Render('signOut')
  // viewSignOut(@Query('r') r: string, @Req() req: Request) {
  //   return { r: decodeURIComponent(r) };
  // }

  // @Version('2')
  // @Get('sign-out')
  // @Render('signOut')
  // async viewSignOutV2(@Query('r') r: string, @Query('u') uuid: string) {
  //   await this.userService.updateSingInStateInDB(uuid);

  //   return { r: decodeURIComponent(r) };
  // }
}
