import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from 'src/app.module';
import { setNestApp } from './common/setup';

config();

async function bootstrap() {
  const APP_PORT = process.env.API_PORT ?? 3000;

  const app = await NestFactory.create(AppModule);
  setNestApp(app);

  console.log(`Listening on port... ${APP_PORT}`);
  await app.listen(APP_PORT);
}
bootstrap();
