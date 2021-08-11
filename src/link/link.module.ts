import { LinkPublicController } from './link-public.controller';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { LinkController } from './link.controller';
import { LinkRepository } from './link.repository';
import { LinkService } from './link.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinkRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [LinkController, LinkPublicController],
  providers: [LinkService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class LinkModule {}
