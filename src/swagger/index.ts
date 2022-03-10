// swagger
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: NestExpressApplication) => {
  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PkNote Swagger')
    .setDescription('PkNote backend API')
    .setVersion('1.0')
    .addTag('beta')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
};
