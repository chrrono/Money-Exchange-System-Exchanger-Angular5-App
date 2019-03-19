import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Message } from '../message.model';
import { MessageSTOMPService } from '../../http-service/message-stomp-service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { DatePipe } from '@angular/common';
import { AuthHttpService } from '../../http-service/auth-http-service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  receivers = ["Poczta","Szubryt","Krynica","Biuro"];
  sender = "";
  content : string;
  messageForm : FormGroup;
  firstFocus = true;
  private serverUrl = 'http://localhost:8080/socket2';
    private stompClient;

  constructor(private datePipe : DatePipe,
              private messageStompService : MessageSTOMPService,
              private authService : AuthHttpService) { }
  

  ngOnInit() {
    this.sender = this.authService.getNameOfWorkPlace();
    this.messageForm = new FormGroup({
      "messageData" : new FormGroup({
        "receiver" : new FormControl("Biuro"),
        "content" : new FormControl("Tutaj wpisz tresc komunikatu ..."),
      })
    })
  }

  afterFirstFocus(){
    if(this.firstFocus == true){
      this.messageForm.patchValue({
        "messageData" : {
          "content" : ""
        }
      })
      this.firstFocus = false;
    }
  }

  SendMessage(){
    let time = this.datePipe.transform(Date.now(), "yyyy-MM-dd HH:mm:ss");
    let message = new Message(this.sender, this.messageForm.get("messageData.receiver").value,
                              this.messageForm.get("messageData.content").value,"information", time);
    this.messageStompService.sendMessage(message);
    
  }

}
