import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from '../api/controllers/user.controller';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateUserHandler } from './commands/create-user.handler';
import { GetUserByEmailHandler } from './queries/get-user-by-email.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally accessible
    }),
    CqrsModule,
    CqrsModule,
    InfrastructureModule,
  ],
  controllers: [UserController],
  providers: [CreateUserHandler, GetUserByEmailHandler],
})
export class AppModule {}
