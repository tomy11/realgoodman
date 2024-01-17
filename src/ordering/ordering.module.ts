import { Module } from '@nestjs/common';
import { OrderingService } from './ordering.service';
import { OrderingController } from './ordering.controller';

@Module({
  providers: [OrderingService],
  controllers: [OrderingController],
  exports: [OrderingService],
})
export class OrderingModule {}
