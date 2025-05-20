import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './application/application.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API to register users and authenticate')
    .setVersion('1.0')
    .build();

    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
  const url = await app.getUrl();
  console.log(`🚀 Application is running at: ${url}`);
  console.log(`📚 Swagger is available at: ${url}/swagger`);
}
bootstrap();