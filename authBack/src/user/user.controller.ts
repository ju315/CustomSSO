import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  async userSignIn(
    @Body() userDto: { userId: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('body data::', userDto);
    const token = this.userService.userSignIn(userDto);

    res.cookie('token', token, {
      httpOnly: false,
      secure: false,
    });

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
}
