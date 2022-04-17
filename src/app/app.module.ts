import { Module } from '@nestjs/common';
import { AuthModule } from '/@/auth/auth.module';
import { DatabaseModule } from '/@/database/mongo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '/@/config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule],
})
export class AppModule {}
