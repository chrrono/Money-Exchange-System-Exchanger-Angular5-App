import { Component, Injectable } from '@angular/core';
import { MessageSTOMPService } from './http-service/message-stomp-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {

  constructor(private stompHttpService : MessageSTOMPService){}
  
  title = 'app';
}
