import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { SignHistoryModel } from 'src/common/entity/signIn.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'bjpark',
    }),
    TypeOrmModule.forFeature([SignHistoryModel]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
