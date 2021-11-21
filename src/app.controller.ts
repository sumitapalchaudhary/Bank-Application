import { Query } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountCreationDTO } from './dto/account-creation-dto';
import { TransactionDTO } from './dto/transaction-dto';
import { BankService } from './service/bank-service';
import { DataService } from './service/data-service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly bankService: BankService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/accountBalance')
  getBalance(@Query('accountNumber') accountNumber: number){
    return this.bankService.getBalance(accountNumber);
  }

  @Get('/transactionsHistory')
  getTransactionsHistory(@Query('accountNumber') accountNumber: number){
    return this.bankService.getTransactionsHistory(accountNumber);
  }


  @Post('/createAccount')
  createAccount(@Body() accountCreationDto: AccountCreationDTO) {
    this.bankService.createAccount(accountCreationDto);
    return "Successfully account created";
  }

  @Post('/makeTransaction')
  makeTransaction(@Body() transactionDto: TransactionDTO) {
    return this.bankService.addTransaction(transactionDto);
  }
}
