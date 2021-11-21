import { Injectable } from "@nestjs/common";
import { AccountBalanceDTO } from "../dto/account-balance-dto";
import { AccountCreationDTO } from "../dto/account-creation-dto";
import { TransactionDTO } from "../dto/transaction-dto";
import { TransactionHistoryDTO } from "../dto/transaction-history-dto";
import { AccountDetails } from "../model/account-details.model";
import { TransactionDetails } from "../model/transaction-details.model";
import { DataService } from "./data-service";

@Injectable()
export class BankService {
    constructor(private readonly dataService: DataService) {}

    public createAccount(accountCreationDto: AccountCreationDTO)
    {
        let accountNumber = Math.floor(Date.now() + Math.random()); // auto generated
        let newAccountDetails = new AccountDetails();
        newAccountDetails.accountNumber = accountNumber;
        newAccountDetails.customerID = accountCreationDto.customerId;
        newAccountDetails.balance = accountCreationDto.depositAmount;
        newAccountDetails.createdTimestamp = new Date();
        newAccountDetails.lastUpdatedTimestamp = new Date();
        this.dataService.saveAccount(newAccountDetails);
    }

    public addTransaction(transactionDto: TransactionDTO): string
    {
        let receiversAccount: AccountDetails = this.dataService.getAccountByAccountNumber(transactionDto.receiverAccountNumber);
        let sendersAccount: AccountDetails = this.dataService.getAccountByAccountNumber(transactionDto.senderAccountNumber);
        if (transactionDto.amount > sendersAccount.balance)
        {
            return "Sender doesn't have enough balance to do the transaction"
        }
        let newTransaction: TransactionDetails = new TransactionDetails();
        newTransaction.senderAccountNumber = transactionDto.senderAccountNumber;
        newTransaction.recipientAccountNumber = transactionDto.receiverAccountNumber;
        newTransaction.amount = transactionDto.amount;
        newTransaction.transactionTimestamp = new Date() 
        this.dataService.saveTransaction(newTransaction);

        // update senders balance
        let senderBalance = sendersAccount.balance - transactionDto.amount;
        this.dataService.updateBalanceOfAccount(transactionDto.senderAccountNumber, senderBalance);

        //update receiver balance
        let receiverBalance = receiversAccount.balance + transactionDto.amount;
        this.dataService.updateBalanceOfAccount(transactionDto.receiverAccountNumber, receiverBalance);
        return "Transaction successful";
    }

    public getBalance(accountNumber: number): AccountBalanceDTO
    {
        let accountBalanceDTO =  new AccountBalanceDTO()
        let accountDetails = this.dataService.getAccountByAccountNumber(accountNumber);
        accountBalanceDTO.accountNumber = accountDetails.accountNumber;
        accountBalanceDTO.balance = accountDetails.balance;
        return accountBalanceDTO;
    }

    public getTransactionsHistory(accountNumber: number): TransactionHistoryDTO[]
    {
        return this.dataService.getTransactionsByAccountNumber(accountNumber)
        .map(tr => {
            let trHistoryDTO = new TransactionHistoryDTO();
            trHistoryDTO.amount = tr.amount;
            trHistoryDTO.senderAccountNumber = tr.senderAccountNumber;
            trHistoryDTO.receiverAccountNumber = tr.recipientAccountNumber;
            trHistoryDTO.transactionTimestamp = tr.transactionTimestamp;
            return trHistoryDTO; 
        });

    }
}