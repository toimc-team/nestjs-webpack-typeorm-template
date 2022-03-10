import { Module } from '@nestjs/common';
import { TypeormModule } from '@/config/typeorm.module';
import { AuthModule } from '@/auth/auth.module';

// redis
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { redisConfig } from './config/redis.config';

@Module({
  imports: [TypeormModule, RedisModule.forRoot(redisConfig), AuthModule],
})
export class AppModule {}
