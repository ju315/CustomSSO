import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger.middleware';
import { ViewModule } from './view/view.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignHistoryModel } from './common/entity/signIn.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.62.13',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'sso-test',
      entities: [SignHistoryModel],
      synchronize: true,
    }),
    UserModule,
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
