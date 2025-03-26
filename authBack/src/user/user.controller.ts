import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  async userSignIn(@Body() userDto: { userId: string; password: string }) {
    console.log('body data::', userDto);
    return this.userService.userSignIn(userDto);
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
