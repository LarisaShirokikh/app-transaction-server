import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [`http://localhost:3000`, `https://31.129.56.94`, `http://localhost:8080`],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });
  await app.listen(PORT);
  console.log(`Сервер запущен и работает на порту ${PORT}`);
}
bootstrap();
