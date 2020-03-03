import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { resolve } from '../libs/utils';

const envPath =
  resolve('env') + `/.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(envPath),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
