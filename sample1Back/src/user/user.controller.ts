import { Body, Controller, Post, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('2')
  @Post('sign-in')
  async signInUser(@Body() data: SignInDto) {
    console.log('> > > /api/v2/sign-in < < <');
    console.log('body::', data);
    await this.userService.signIn(data);

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

  @Post('check-sign-in')
  async checkSignInUser(@Body('s') sessionId: string) {
    const res = await this.userService.checkSignInUser(sessionId);

    return { data: res };
  }
}
