import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { getEnvPath } from './common/helper/env.helper';
import { TimeoutInterceptor } from './exception/timeout-exception.filter';
import { GlobalMiddleware } from './middleware/logger.middleware';

const envFilePath: string = getEnvPath();
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true, cache: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  exports: [],
  providers: [
    GlobalMiddleware,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class CoreModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(GlobalMiddleware)
      .forRoutes({ path: '**', method: RequestMethod.ALL });
  }
}
