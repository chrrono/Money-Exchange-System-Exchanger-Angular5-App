import { Component, OnInit } from '@angular/core';
import { CurrencyStateService } from '../currency-states/currency-state.service';
import { CurrencyStateHttpService } from '../http-service/currency-state-http-service';
import { TransactionHttpService } from '../http-service/transaction-http-service';
import { AuthHttpService } from '../http-service/auth-http-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  isOpenTransaction = false;

  constructor(private currencyHttp : CurrencyStateHttpService,
              private transactionHttp : TransactionHttpService,
              private authService : AuthHttpService) { }

  ngOnInit() {
    // this.currencyHttp.getCurrencyStates();
    // this.transactionHttp.getTodayTransactionHistory();
  }

  onLoadData(){
    this.currencyHttp.getCurrencyStates();
    this.transactionHttp.getTodayTransactionHistory();
  }
  
  changeIsOpenTransaction(){
    this.isOpenTransaction = !this.isOpenTransaction;
  }

  onLogout(){
    this.authService.logout();
  }
}
