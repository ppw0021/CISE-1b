import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Load environment variables from .env file
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 7000;

  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrap();
