import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Transaction } from "../transactions/transaction.model";
import { CurrencyStateHttpService } from "./currency-state-http-service";
import { TransactionService } from "../transactions/transaction.service";
import { AuthHttpService } from "./auth-http-service";
import { Subscription } from "rxjs/Subscription";
import { DatePipe } from "@angular/common";

@Injectable()
export class TransactionHttpService implements OnDestroy{
    

    private moneyExchangeName = "Szubryt";
    private authSubscription : Subscription;

    constructor(private datePipe : DatePipe,
                private httpClient : HttpClient,
                private currencHttpStateService : CurrencyStateHttpService,
                private transactionService : TransactionService,
                private authService : AuthHttpService){

                    this.authSubscription = this.authService.ifLoginChanged.subscribe((state : boolean) => {
                        if(state == true) {
                            this.getTodayTransactionHistory();
                            this.getAllBankTransaction();
                        }
                        else
                            this.transactionService.setTodayTransaction(null);
                    })
                }

    sendTransaction(transaction : Transaction){
        let currency = transaction.currency;
        this.httpClient.post('http://localhost:8080/transaction/newTransaction/'+this.authService.getNameOfWorkPlace()+'/'+currency, transaction,{
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        })
            .subscribe((response : Response) => {
                //  console.log(response.json)
                 setTimeout(() => this.currencHttpStateService.getCurrencyStates(), 2000);
                 setTimeout(() => this.getTodayTransactionHistory(), 2000);
            });
    }

    editTransaction(transaction : Transaction){
        let id = transaction.id;
        let currency = transaction.currency;
        this.httpClient.post('http://localhost:8080/transaction/editTransaction/'+
                             this.authService.getNameOfWorkPlace()+'/'+currency+'/Id/'+id, transaction, {
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        })
            .subscribe((response : Response) => {
                // console.log(response.json)
                setTimeout(() => this.currencHttpStateService.getCurrencyStates(), 2000);
                setTimeout(() => this.getTodayTransactionHistory(), 2000);
            });
    }

    getTodayTransactionHistory(){
        this.httpClient.get<Transaction []>('http://localhost:8080/transaction/today/'+this.authService.getNameOfWorkPlace(),{
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((transactions : Transaction []) => {
            // console.log(transactions);
            this.transactionService.setTodayTransaction(transactions);
        })
    }

    sendThatSellTransactionToBankIsExecuted(id : number){
        let bankTransaction : Transaction;
        bankTransaction = this.transactionService.getBankTransactionById(id);
        let newTransaction = this.createbankSellTransaction(bankTransaction);
        
        this.httpClient.post('http://localhost:8080/transaction/sellToTheBank/'+id+'/update', "",{
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((response : Response) => {
            // console.log(response)
        });
        this.sendTransaction(newTransaction);
    }

    getAllBankTransaction(){
        this.httpClient.get<Transaction []>('http://localhost:8080/transaction/sellToTheBank/All',{
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((transactions : Transaction []) => {
            // console.log(transactions);
            this.transactionService.setBankTransactionList(transactions);
        })
    }

    private createbankSellTransaction(transaction : Transaction) : Transaction{
        
        let now = Date.now();
        let date = this.datePipe.transform(now, "yyyy-MM-dd");
        let time = this.datePipe.transform(now, "yyyy-MM-dd HH:mm:ss");
        let id = -1;

        let newSellToTheBank = new Transaction(id,
                                                transaction.currency,
                                                "Sell",
                                                transaction.amountOfCurrency,
                                                transaction.amountOfZlotych,
                                                transaction.rateOfExchange,
                                                date, time);
        
        return newSellToTheBank;

    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}