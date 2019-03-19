// import { DatePipe } from "@angular/common";

export class Transaction {

    public id : number;
    public currency : string;
    public type : string;
    public amountOfCurrency : number;
    public amountOfZlotych : number;
    public rateOfExchange : number;
    public date : string;
    public time : string;

    constructor(id : number, currency : string, type : string, amountOfCu : number, amountOfZ : number, rateOfE : number, date : string, time : string){
        //private datePipe : DatePipe,
        // let now = Date.now();
        // this.date = this.datePipe.transform(now, "yyyy-mm-dd");
        // this.time = this.datePipe.transform(now, "yyyy-MM-dd hh:mm:ss")
        this.id = id;
        this.currency = currency;
        this.type = type;
        this.amountOfCurrency = amountOfCu;
        this.amountOfZlotych = amountOfZ;
        this.rateOfExchange = rateOfE;
        this.date = date;
        this.time = time;
    }



}