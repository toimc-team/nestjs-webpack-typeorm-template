import { Module } from '@nestjs/common';

import { resolve } from '@/libs/utils';

import { TypeOrmModule } from '@nestjs/typeorm';

import * as config from 'config';
import type { EntitySchema } from 'typeorm';

const isDebug: boolean = process.env.NODE_ENV === 'development';
// https://github.com/nestjs/nest/issues/755#issuecomment-394073763
const entityContext = isDebug && require.context('../', true, /\.entity\.ts$/);

const dbConfig = config.get('db');

// https://github.com/nestjs/nest/issues/744#issuecomment-394479135
const entities = isDebug
  ? [
      ...(entityContext.keys().map((id) => {
        const entityModule = entityContext(id);
        // We must get entity from module (commonjs)
        // Get first exported value from module (which should be entity class)
        const [entity] = Object.values(entityModule);
        return entity;
      }) as EntitySchema<any>[]),
    ]
  : // 这里一定要注意是dist目录，否则会报连接异常
    [resolve('dist') + '/**/*.entity{.ts,.js}'];
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities,
      synchronize: process.env.SYNC || dbConfig.synchronize,
      keepConnectionAlive: true,
      ...(dbConfig.type === 'mongodb'
        ? {
            // only for mongodb
            useUnifiedTopology: true,
            useNewUrlParser: true,
          }
        : {}),
    }),
  ],
})
export class TypeormModule {}
