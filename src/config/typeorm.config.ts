import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from '@/libs/utils'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: 'root',
  password: 'root',
  database: 'board',
  entities: [resolve('src') + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}