import { Injectable } from "@angular/core";
import { Message } from "./message.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class MessagesService{

    messageWasAdded = new Subject<Message[]>();
    messages : Message [] = [
        {
        "type" : "komunikat",
        "content" : "wiadomosc od kasjera safffffffff asfffffffffffff asffff",
        "sender" : "Szubryt",
        "receiver" : "Poczta",
        "time" : "2018-09-15 16:11:42"
      }];

    constructor(){}

    addMessage(message : Message){
        this.messages.unshift(message);
        this.messageWasAdded.next(this.messages.slice());
    }

    setMessages(messages : Message []){
        if(messages == [])
            return;
        
        let deletedIndex: number [] = [];
        messages.forEach( (message) => {
            if(message.type === "BankTransaction" && message.receiver == "Biuro"){
                deletedIndex.push(messages.indexOf(message));
            }    
        })

        let counter = 0
        deletedIndex.forEach( (index) => {
            messages.splice(index-counter,1);
            counter++;
        })

        this.messages = messages;
        this.messageWasAdded.next(this.messages.slice());
    }

    deletMessage(message : Message){
        let index = this.messages.indexOf(message);
        if(index != -1){
            this.messages.splice(index,1);
            this.messageWasAdded.next(this.messages.slice());
        }
    }

    getMessages(){
        return this.messages.slice();
    }
}