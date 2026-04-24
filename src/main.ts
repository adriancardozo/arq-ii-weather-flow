import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dns from 'dns';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dns.setServers(process.env.DNS_SERVERS?.split(',') ?? []);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
