import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from 'src/app.module';
import { AllExceptionsFilter } from './common/filters/exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptors';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerService } from './common/logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

config();

async function bootstrap() {
  const APP_PORT = process.env.API_PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: 'v1' });
  ['v1', 'v2'].forEach((ver) => {
    const config = new DocumentBuilder()
      .setTitle('IN!T platform API')
      .setVersion(ver)
      .addTag('app')
      .build();
    const docs = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${ver}/docs`, app, docs);
  });

  app.useGlobalPipes(new ValidationPipe());

  // Filters
  app.useGlobalFilters(new AllExceptionsFilter(new LoggerService()));

  // Interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(new LoggerService()),
    new ResponseInterceptor(),
  );

  console.log(`Listening on port... ${APP_PORT}`);
  await app.listen(APP_PORT);
}
bootstrap();
