import { LinkModule } from './link/link.module';
import { LinkController } from './link/link.controller';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { configService } from './config/orm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/role.module';
import { LoggerMiddleware } from './operationLogs/logger.middleware';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { OperationLogsModule } from './operationLogs/operationLogs.module';

@Module({
  imports: [ TypeOrmModule.forRoot(configService.getTypeOrmData()), UserModule, AuthModule, RolesModule, OperationLogsModule, LinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/(.*)', method: RequestMethod.GET},
        { path: '/users', method: RequestMethod.GET },
        { path: '/links/(.*)', method: RequestMethod.GET},
        { path: '/links', method: RequestMethod.GET }, 
      )
      .forRoutes(UserController, AuthController, LinkController)
  }
}


