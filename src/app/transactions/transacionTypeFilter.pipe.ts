import { Pipe, PipeTransform } from "@angular/core";
import { Transaction } from "./transaction.model";

@Pipe({
    name : 'typeFilter',
    pure : false
})
export class transactionTypeFilter implements PipeTransform{
    transform(transactions : Transaction [], type: string) {
        return transactions.filter(transaction => transaction.type.toLowerCase().indexOf(type.toLowerCase()) !== -1);
        }
    

}