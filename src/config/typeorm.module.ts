import { Module } from '@nestjs/common';
import { resolve } from '@/libs/utils';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          // 这里一定要注意是dist目录，否则会报连接异常
          entities: [resolve('dist') + '/**/*.entity{.ts,.js}'],
          synchronize: process.env.SYNC || configService.get('SYNCHRONIZE'),
          // only for mongodb
          useUnifiedTopology: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class TypeormModule {}
