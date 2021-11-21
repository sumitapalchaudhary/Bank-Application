import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankService } from './service/bank-service';
import { DataService } from './service/data-service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DataService, BankService],
  exports: [BankService]
})
export class AppModule {}
