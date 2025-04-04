import { Body, Controller, Post, Version } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('2')
  @Post('sign-in')
  async signInUser(@Body() data: any) {
    console.log('body data::', data);
    const res = this.userService.signIn(data);

    return {
      success: true,
    };
  }

  @Post('validate')
  async validateUser(@Body() data: any) {
    const res = this.userService.validateUser(data);
    return res;
  }

  @Post('sign-out')
  async singOutUser(@Body() data: any) {
    const res = this.userService.signOut(data);
    return res;
  }
}
