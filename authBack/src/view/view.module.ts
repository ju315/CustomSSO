import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ViewController } from './view.controller';

@Module({
  imports: [UserModule],
  controllers: [ViewController],
  providers: [],
})
export class ViewModule {}
