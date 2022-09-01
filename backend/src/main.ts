import { v1 } from '@infrastructure/configs/versions/v1';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from 'src/app.module';
import { AllExceptionsFilter } from './common/filters/exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptors';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerService } from './common/logger/logger.service';

config();

async function bootstrap() {
  const port = process.env.API_PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: v1 });

  app.useGlobalPipes(new ValidationPipe());

  // Filters
  app.useGlobalFilters(new AllExceptionsFilter(new LoggerService()));

  // Interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(new LoggerService()),
    new ResponseInterceptor(),
  );

  await app.listen(port, () => console.log('Listening on port', port));
}
bootstrap();
