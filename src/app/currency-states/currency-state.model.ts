export class CurrencyState {
    public currency: string;
    public currencyState: number;
    public zloteState: number;
    public averageRateExchange: number;

    constructor(curr : string, currencySt : number, zloteSt: number, averageRa: number){
        this.currency = curr;
        this.currencyState = currencySt;
        this.zloteState = zloteSt;
        this.averageRateExchange = averageRa; 
    }
}