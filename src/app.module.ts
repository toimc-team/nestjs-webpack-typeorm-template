import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModule } from './config/typeorm.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [TypeormModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
