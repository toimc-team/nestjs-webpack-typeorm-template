import { Module } from '@nestjs/common';
import { TypeormModule } from '@/config/database/typeorm.module';
import { AuthModule } from '@/auth/auth.module';

// redis
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { redisConfig } from './config/redis.config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [TypeormModule, RedisModule.forRoot(redisConfig), AuthModule],
  providers: [AppService],
})
export class AppModule {}
