import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModule } from './config/typeorm.module';

@Module({
  imports: [TypeormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
