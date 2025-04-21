import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Response } from 'express';
import { SignInDto } from './dto/signIn.dto';
import { SignInGuard } from 'src/common/guard/signIn.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Post('/sign-in')
  async userSignIn(@Body() body: SignInDto, @Res() res: Response) {
    const result = await this.userService.signInBase(body);

    res.cookie('user', JSON.stringify(result));
    res.cookie('TEST.sid', result.sessionId);

    return res.status(200).send(result);
  }

  @Version('1')
  @UseGuards(SignInGuard)
  @Post('/sign-out')
  async userSignOut(@Body() data: { sid: string }, @Res() res: Response) {
    await this.userService.signOut(data.sid);

    res.clearCookie('TEST.sid');
    res.clearCookie('user');

    res.status(200).send();
  }

  @Version('1')
  @UseGuards(SignInGuard)
  @Post('/test')
  userTest() {
    return { data: 'ok' };
  }
}
