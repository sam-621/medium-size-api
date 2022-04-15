import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('Medium Size Docs')
    .setDescription('Doc for Medium Size API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  /**
   * Start of the application
   */
  await app.listen(4000, () => {
    console.log('Running on port 4000');
  });
}
bootstrap();
