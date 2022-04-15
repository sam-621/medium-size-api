import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { schemaValidations } from './schemas.config';
import { configValues, getEnvPath } from './values.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: getEnvPath(process.env.NODE_ENV),
      load: [configValues],
      isGlobal: true,
      validationSchema: schemaValidations,
    }),
  ],
})
export class ConfigModule {}
