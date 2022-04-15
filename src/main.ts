import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const mode = process.env.NODE_ENV;

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
  await app.listen(port, () => {
    console.log(`Running on port ${port}`);
    console.log(`Running in "${mode}" mode`);
  });
}
bootstrap();
