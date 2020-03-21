import { Module } from '@nestjs/common';
import { TypeormModule } from './config/typeorm.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeormModule, AuthModule],
})
export class AppModule {}
