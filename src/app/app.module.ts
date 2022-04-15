import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/mongo.module';
import { ConfigModule } from '/@/config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule {}
