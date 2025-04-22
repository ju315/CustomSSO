import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_BACK } from 'src/common/const';

@Module({
  imports: [
    HttpModule.register({
      baseURL: AUTH_BACK,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    JwtModule.register({
      secret: 'SSO-PROJECT',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
