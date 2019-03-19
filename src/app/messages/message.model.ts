import { DatePipe } from "@angular/common";

export class Message{
    sender : string;
    receiver : string;
    content : string;
    type : string;
    time : string;

    constructor(sen : string, rec : string, con : string, typ : string, time : string){
        this.sender = sen;
        this.receiver = rec;
        this.content = con;
        this.type = typ;
        this.time = time;
    }
 }