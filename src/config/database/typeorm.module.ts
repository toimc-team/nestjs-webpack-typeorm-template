import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './typeorm-ex.module';

import { User } from 'src/entities/user.entity';
import { connectionParams } from '@/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionParams),
    TypeOrmExModule.forCustomRepository([User]),
  ],
})
export class TypeormModule {}
