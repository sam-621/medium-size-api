import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/mongo.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '/@/config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule],
})
export class AppModule {}
