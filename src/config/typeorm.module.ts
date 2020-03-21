import { Module } from '@nestjs/common';
import { resolve } from '@/libs/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      // 这里一定要注意是dist目录，否则会报连接异常
      entities: [resolve('dist') + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.SYNC || dbConfig.synchronize,
      // only for mongodb
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
  ],
})
export class TypeormModule {}
