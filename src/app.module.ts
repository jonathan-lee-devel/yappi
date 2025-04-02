import { Module } from '@nestjs/common';

import { EntryPointController } from './controllers/entry-point/entry-point.controller';
import { MockApiService } from './services/mock-api/mock-api.service';

@Module({
  imports: [],
  controllers: [EntryPointController],
  providers: [MockApiService],
})
export class AppModule {}
