import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 8080
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(PORT);
  Logger.log(`Server running on port ${PORT}`, 'Bootstrap');
}
bootstrap();
