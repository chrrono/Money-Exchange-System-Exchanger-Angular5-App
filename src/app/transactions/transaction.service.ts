import { Injectable } from "@angular/core";
import { TransactionHttpService } from "../http-service/transaction-http-service";
import { Transaction } from "./transaction.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TransactionService {
    
    transactionHistoryChanged = new Subject<Transaction[]>();
    transactionList : Transaction[] = [];
    bankTransactionList : Transaction[] = [];

    constructor(){}

    setTodayTransaction(transactions : Transaction []){
        if(transactions == null)
           this.transactionList = [ new Transaction(-1,"uknown","uknown",0,0,0,"uknown","uknown")];
        else
            this.transactionList = transactions;
        console.log(this.transactionList);
        this.transactionHistoryChanged.next(this.transactionList.slice());
    }

    getTodayTransactions(){
        return this.transactionList.slice();
    }

    getTransactionById(id : number){
        return this.transactionList.filter(x => x.id === id);
    }

    setBankTransactionList(transactions : Transaction[]){
        this.bankTransactionList = transactions;
    }


    addBankTransaction(trToBank : Transaction){
        this.bankTransactionList.push(trToBank);
    }

    deleteFromBankTransaction(trToBank : Transaction){
        let index = this.bankTransactionList.indexOf(trToBank);
        this.bankTransactionList.splice(index,1);
    }

    getBankTransactionById(id: number){
        return this.bankTransactionList.find(tr => tr.id === id);
    }
}