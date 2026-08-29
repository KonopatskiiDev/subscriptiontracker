import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().set('trust proxy', 1);
  app.use(cookieSession({
    keys: ['my-secret-key'],
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  app.enableCors({
    origin: 'https://frontend-production-f7ec.up.railway.app',
    credentials: true
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
