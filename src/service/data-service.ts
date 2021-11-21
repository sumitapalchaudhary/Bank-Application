import * as fs from 'fs';
import * as customerData from '../data/customer-details.json';
import { Injectable } from '@nestjs/common';
import { CustomerDetails } from 'src/model/customer-details.model';
import { AccountDetails } from 'src/model/account-details.model';
import { TransactionDetails } from 'src/model/transaction-details.model';

@Injectable()
export class DataService {

    constructor(){}
    public getCustomerDetails() : CustomerDetails[] {
        let customerDetails: CustomerDetails[] =  (<CustomerDetails[]>customerData);
        return customerDetails;
    }

    public getAllAccountDetails(){
        fs.readFile("src/data/account-details.json", 'utf8', function readFileCallback(err, data){
            let accountDetailsList = JSON.parse(data); 
            return accountDetailsList;
        });
    }

    public getAccountByAccountNumber(accountNumber: number): AccountDetails
    {
        const data = fs.readFileSync("src/data/account-details.json",{encoding:'utf8', flag:'r'});
        let accountDetailsList: AccountDetails[] = JSON.parse(data); 
        return accountDetailsList.filter(a => a.accountNumber == accountNumber)[0];
    }

    public getTransactionsByAccountNumber(accountNumber: number): TransactionDetails[]
    {
        const data = fs.readFileSync("src/data/transaction-details.json",{encoding:'utf8', flag:'r'});
        let transactionsDetailsList: TransactionDetails[] = JSON.parse(data); 
        return transactionsDetailsList.filter(tr => tr.senderAccountNumber == accountNumber || tr.recipientAccountNumber == accountNumber);
    }

    public saveAccount(accountDetails: AccountDetails){
        const data = fs.readFileSync("src/data/account-details.json", 'utf8');
        let accountDetailsList: AccountDetails[] = JSON.parse(data); 
        fs.readFile("src/assets/account-details.json", 'utf8', function readFileCallback(err, data){
            if (err)
            {
                console.log(err);
            } 
            else 
            {
            let accountDetailsList = JSON.parse(data); 
            accountDetailsList.push(accountDetails); 
            var json = JSON.stringify(accountDetailsList, null, 4); 
            fs.writeFile("src/data/account-details.json", json, 'utf8', function(err) 
            {
                if (err) throw err;
            });
        }});
    } 

    public saveTransaction(transaction: TransactionDetails){
        var fs = require('fs');
        fs.readFile("src/data/transaction-details.json", 'utf8', function readFileCallback(err, data){
            if (err)
            {
                console.log(err);
            } 
            else 
            {
            let transactionsList = JSON.parse(data); 
            transactionsList.push(transaction); 
            var json = JSON.stringify(transactionsList, null, 4); 
            fs.writeFile("src/data/transaction-details.json", json, 'utf8', function(err) 
            {
                if (err) throw err;
            });
        }});
    }

    public updateBalanceOfAccount(accountNumber: number, balance: number)
    {
        const data = fs.readFileSync("src/data/account-details.json", 'utf8');
        let accountDetailsList = JSON.parse(data); 
        accountDetailsList.forEach(a => {
            if (a.accountNumber == accountNumber)
            {
                a.balance = balance;
            }
        });
        var json = JSON.stringify(accountDetailsList, null, 4);
        fs.writeFile("src/data/account-details.json", json, 'utf8', function(err) 
        {
            if (err) throw err;
        });
        
    }
}