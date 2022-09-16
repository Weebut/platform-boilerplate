import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/exceptions.filter';
import { LoggingInterceptor } from './interceptors/logger.interceptors';
import { LoggerService } from './logger/logger.service';

export function setNestApp<T extends INestApplication>(app: T): void {
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

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Filters
  app.useGlobalFilters(new AllExceptionsFilter(new LoggerService()));

  // Interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(new LoggerService()),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
}
