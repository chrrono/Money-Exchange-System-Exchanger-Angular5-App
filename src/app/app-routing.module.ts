import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionsHistoryComponent } from "./transactions/transactions-history/transactions-history.component";
import { NewTransactionComponent } from "./transactions/new-transaction/new-transaction.component";
import { CurrencyStateComponent } from "./currency-states/currency-states.component";
import { MessagesComponent } from "./messages/messages.component";
import { LogginComponent } from "./loggin/loggin.component";
import { AuthGuard } from "./loggin/auth-guard.service";

const routes : Routes = [

    {   path:'', redirectTo : "/home", pathMatch: 'full' },
    {   path: 'home', component : HomeComponent },
    {   path: 'transactions/history', component: TransactionsHistoryComponent, canActivate: [AuthGuard]},
    {   path: 'transactions/newTransaction/:transactionId', component: NewTransactionComponent, canActivate: [AuthGuard]},
    {   path: 'currencyState', component: CurrencyStateComponent, canActivate: [AuthGuard]},
    {   path: 'message', component: MessagesComponent, canActivate: [AuthGuard]},
    {   path: 'login', component: LogginComponent},
    {   path: 'transacions/edit/:transactionId' , component: NewTransactionComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class MainRoutingModule {

}