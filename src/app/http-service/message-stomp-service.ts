import { Injectable, OnInit, OnDestroy } from "@angular/core";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from "../messages/message.model";
import { MessagesService } from "../messages/messages.service";
import { AuthHttpService } from "./auth-http-service";
import { Transaction } from "../transactions/transaction.model";
import { TransactionService } from "../transactions/transaction.service";
import { TransactionHttpService } from "./transaction-http-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";


@Injectable()
export class MessageSTOMPService implements OnInit, OnDestroy{
    
    private serverUrl = 'http://localhost:8080/socket2';
    private stompClient;
    private authSubscription : Subscription;


    constructor(private messageService : MessagesService,
                private authService : AuthHttpService,
                private transactionHttpService : TransactionHttpService,
                private transactionService : TransactionService,
                private httpClient : HttpClient,
                private router: Router){
            
                    this.authSubscription = this.authService.ifLoginChanged.subscribe((state : boolean) => {
                        if(state == true) {
                            this.initialize();
                        }
                        else{
                            this.stompClient.disconnect();
                        }
                    })
                    
    }

    ngOnInit() {}

    initialize(){
    //czyności wykonywane gdu połączenie zostanie rozłączone
        // let webSocket = new SockJS(this.serverUrl);
        let webSocket = new SockJS(this.serverUrl+"/?access_token="+this.authService.getToken());
        this.stompClient = Stomp.over(webSocket);
        let that = this;
        
        this.stompClient.connect({}, () => {
            this.loadAllMessages();
            that.stompClient.subscribe("/user/employee/queue", (result) => {
                let variable = JSON.parse(result.body)
                let message : Message;
                if(variable.id != undefined){
                    setTimeout(() => this.transactionHttpService.getTodayTransactionHistory(), 2000);
                    let trToBank : Transaction = JSON.parse(result.body);
                    this.transactionService.addBankTransaction(trToBank);
                    message = this.transformBankTransactionToMessage(trToBank);
                }
                else
                    message = JSON.parse(result.body);
                
                this.messageService.addMessage(message);
                console.log(message);
            });
        },()=>{
            this.authService.logout()
            this.router.navigate(['login']);
            alert("Wymagane ponowne logowanie");
        });
    }

    loadAllMessages(){
        this.httpClient.get<Message []>('http://localhost:8080/messages/All/'+this.authService.getNameOfWorkPlace(),{
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((messages : Message []) => {
            console.log(messages);
            this.messageService.setMessages(messages);
            this.loadAllBankTransaction();
        })
    }

    loadAllBankTransaction(){
        this.httpClient.get<Transaction []>('http://localhost:8080/transaction/sellToTheBank/All/'
                        +this.authService.getNameOfWorkPlace(),{
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((bankTransaction : Transaction []) => {
            console.log(bankTransaction);
            let message : Message;
            bankTransaction.forEach( (tr) => {
                message = this.transformBankTransactionToMessage(tr);
                this.messageService.addMessage(message);
            })   
        })
    }
    
    
    sendMessage(message : Message){
        this.stompClient.send("/app/send/toManager" , {}, JSON.stringify(message)); 
        this.messageService.addMessage(message);
    }

    transformBankTransactionToMessage(trToBank : Transaction ) : Message {
        let time = trToBank.time;
        let receiver =  this.authService.getNameOfWorkPlace();
        let sender = "Biuro";
        let type = "BankTransaction";
        let content = "id : "+ trToBank.id +" ;"+
                    "Waluta : " + trToBank.currency + " ;"+
                    "Ilość Sprzedanej waluty : "+ trToBank.amountOfCurrency +" ;"+
                    "Kurs : "+trToBank.rateOfExchange+" ;";  

        let message = new Message(sender, receiver, content, type, time);
        return message;
    }
    
    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

}