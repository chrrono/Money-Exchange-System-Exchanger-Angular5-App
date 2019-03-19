import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrencyStateComponent } from './currency-states/currency-states.component';
import { CurrencyStateListComponent } from './currency-states/currency-state-list/currency-state-list.component';
import { CurrencyStateService } from './currency-states/currency-state.service';
import { CurrencyStateHttpService } from './http-service/currency-state-http-service';
import { TransactionService } from './transactions/transaction.service';
import { TransactionHttpService } from './http-service/transaction-http-service';
import { TransactionsComponent } from './transactions/transactions.component';
import { NewTransactionComponent } from './transactions/new-transaction/new-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TransactionsHistoryComponent } from './transactions/transactions-history/transactions-history.component';
import { transactionTypeFilter } from './transactions/transacionTypeFilter.pipe';
import { MessagesComponent } from './messages/messages.component';
import { MessagesPanelComponent } from './messages/messages-panel/messages-panel.component';
import { NewMessageComponent } from './messages/new-message/new-message.component';
import { MessageSTOMPService } from './http-service/message-stomp-service';
import { MessagesService } from './messages/messages.service';
import { MainRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DropdownDirecive } from './header/dropdown.directive';
import { LogginComponent } from './loggin/loggin.component';
import { AuthHttpService } from './http-service/auth-http-service';
import { AuthGuard } from './loggin/auth-guard.service';
import {AuthReqInterceptor} from './http-service/authReqInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyStateComponent,
    CurrencyStateListComponent,
    TransactionsComponent,
    NewTransactionComponent,
    TransactionsHistoryComponent,
    transactionTypeFilter,
    MessagesComponent,
    MessagesPanelComponent,
    NewMessageComponent,
    HomeComponent,
    DropdownDirecive,
    LogginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainRoutingModule,
  ],
  providers: [CurrencyStateService, 
              CurrencyStateHttpService, 
              TransactionService,
              TransactionHttpService,
              MessagesService,
              MessageSTOMPService,
              AuthHttpService,
              DatePipe,
              AuthGuard,
              {provide : HTTP_INTERCEPTORS, useClass: AuthReqInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
