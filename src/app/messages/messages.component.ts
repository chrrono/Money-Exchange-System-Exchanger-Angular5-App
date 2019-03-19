import { Component, OnInit } from '@angular/core';
import { MessageSTOMPService } from '../http-service/message-stomp-service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private messageService : MessageSTOMPService) { }

  ngOnInit() {
    // this.messageService.initialize();
  }

}
