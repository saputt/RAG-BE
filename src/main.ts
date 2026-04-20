import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //memuat default pada awalan API
  app.setGlobalPrefix('api');
  app.enableCors(
    
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // menghapus field yang tidak ada di DTO
      forbidNonWhitelisted: true, //memberikan error jika user kirim field yang aneh
      transform: true, //otomatis mengubah tipe data sesuai dengan DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
