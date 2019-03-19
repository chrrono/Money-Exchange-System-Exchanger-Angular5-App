import { CurrencyState } from "./currency-state.model" 
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class CurrencyStateService{
    
    currencyStateChanged = new Subject<CurrencyState[]>();

    currencyStateList : CurrencyState [] = [
        new CurrencyState("EUR",1000.00,4231.20,4.2312),
        new CurrencyState("USD",150.00,543.15,3.621)
    ];

    getCurrencyStateList(){
        return this.currencyStateList.slice();
    }

    setCurrencyStates(states : CurrencyState []){
        if(states == null)
            this.currencyStateList = [new CurrencyState("EUR",0,0,0)];
        else
            this.currencyStateList = states;
        console.log(this.currencyStateList);
        this.currencyStateChanged.next(this.currencyStateList.slice());
    }
}