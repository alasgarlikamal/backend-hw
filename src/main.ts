import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const PORT = parseInt(process.env.PORT)
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
