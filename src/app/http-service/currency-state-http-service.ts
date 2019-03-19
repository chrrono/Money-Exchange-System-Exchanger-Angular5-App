import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CurrencyState } from "../currency-states/currency-state.model";
import { CurrencyStateService } from "../currency-states/currency-state.service";
import { AuthHttpService } from "./auth-http-service";
import { Subscription } from "rxjs/Subscription";
import { BrowserPlatformLocation } from "@angular/platform-browser/src/browser/location/browser_platform_location";

@Injectable()
export class CurrencyStateHttpService implements OnDestroy{
    
    private authSubscription : Subscription;

    constructor(private httpClient : HttpClient,
                private currencyStateService : CurrencyStateService,
                private authService: AuthHttpService){

        this.authSubscription = this.authService.ifLoginChanged.subscribe((state : boolean) => {
            if(state == true)
                this.getCurrencyStates();
            else
                this.currencyStateService.setCurrencyStates(null);
        })
    }

    getCurrencyStates(){
        this.httpClient.get<CurrencyState[]>(('http://localhost:8080/currencyState/moneyExchangeOffice/'+this.authService.getNameOfWorkPlace()),{
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe( (currencyStates : CurrencyState[]) => {
            console.log(currencyStates);
            this.currencyStateService.setCurrencyStates(currencyStates);
        });
    } 

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
    
}