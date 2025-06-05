import { Module } from '@nestjs/common';
import { MongooseConfig, UserModelConfig } from './config/mongoose.config';
import { UserRepositoryImpl } from './repositories/user.repository.impl';

@Module({
  imports: [MongooseConfig, UserModelConfig],
  providers: [UserRepositoryImpl],
  exports: [UserRepositoryImpl],
})
export class InfrastructureModule {}
