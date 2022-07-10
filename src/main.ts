import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';

// 请求限制
import rateLimit from 'express-rate-limit';
// 安全头
import helmet from 'helmet';

import * as Config from 'config';
const config = Config.get('server');

import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { setupSwagger } from './swagger/index';

export async function bootstrap(): Promise<NestExpressApplication> {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.enableVersioning();

  // 注册 Swagger 的配置顺序
  if (Config.get('swagger').enable) {
    setupSwagger(app);
  }

  const port = process.env.PORT || config.port;
  await app.listen(port);
  logger.log(`Application listening on url: http://${config.origin}:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => void app.close());
  }

  return app;
}

void bootstrap();
