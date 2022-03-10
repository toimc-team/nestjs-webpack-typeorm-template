import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('我的内容')
export class AppService {
  @ApiOperation({ summary: 'swagger hello' })
  getHello(): string {
    return 'Hello World!';
  }
}
