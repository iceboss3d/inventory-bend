import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/loggin.interceptor';
import { UserModule } from './user/user.module';
import { InventoryModule } from './inventory/inventory.module';
import { ActivityController } from './activity/activity.controller';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), InventoryModule, ActivityModule],
  controllers: [AppController, ActivityController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }, {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  }],
})
export class AppModule {}
