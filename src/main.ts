import { NestFactory } from '@nestjs/core';
import { MonumentModule } from './monument.module';

async function bootstrap() {
  const app = await NestFactory.create(MonumentModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
