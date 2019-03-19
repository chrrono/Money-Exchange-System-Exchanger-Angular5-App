import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from '../message.model';
import { Subscription } from 'rxjs/Subscription';
import { MessageSTOMPService } from '../../http-service/message-stomp-service';
import { Transaction } from '../../transactions/transaction.model';
import { Router } from '@angular/router';
import { TransactionHttpService } from '../../http-service/transaction-http-service';

@Component({
  selector: 'app-messages-panel',
  templateUrl: './messages-panel.component.html',
  styleUrls: ['./messages-panel.component.css']
})
export class MessagesPanelComponent implements OnInit, OnDestroy {

  subsciption : Subscription;
  messages : Message [];

  constructor(private messageService : MessagesService,
              private messageStompService : MessageSTOMPService,
              private transactionHttpService : TransactionHttpService,
              private router : Router) { 

  }

  ngOnInit() {
    this.subsciption = this.messageService.messageWasAdded.subscribe(
      (mess : Message []) => {
        this.messages = mess;
      }
    );
    this.messages = this.messageService.getMessages();
  }

  sendThatSellTransactionToTheBankIsExecuted(message : Message){
    
    let messageContent : string = message.content;
    let splitTable = messageContent.split(' ',3);
    let idOfTransaction : number = +splitTable[2];
    this.transactionHttpService.sendThatSellTransactionToBankIsExecuted(idOfTransaction);
    this.messageService.deletMessage(message);
    console.log(idOfTransaction);
  }

  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }

}
