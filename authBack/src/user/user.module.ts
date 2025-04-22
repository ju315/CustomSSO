import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SignHistoryModel } from 'src/common/entity/signInHistory.entity';
import { SignInSessionModel } from 'src/common/entity/signInSession.entity';
import { WebSignInSessionModel } from 'src/common/entity/webSession.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SSO-PROJECT',
    }),
    TypeOrmModule.forFeature([
      SignHistoryModel,
      SignInSessionModel,
      WebSignInSessionModel,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
