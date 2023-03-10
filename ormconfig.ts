import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

import * as config from 'config';

const dbConfig = config.get('db');

// 通过dotENV来解析不同的配置
export function buildConnectionOptions() {
  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [__dirname + '/**/*.entity.ts']
      : [__dirname + '/**/*.entity{.js,.ts}'];

  return {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: entitiesDir,
    synchronize: process.env.SYNC || dbConfig.synchronize,
    ...(dbConfig.type === 'mongodb'
      ? {
          // only for mongodb
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }
      : {}),

    logging: process.env.NODE_ENV === 'development',
    // logging: false,
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnectionOptions();

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
