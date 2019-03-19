import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css']
})
export class TransactionsHistoryComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  transactionList : Transaction [];

  constructor(private transactionService : TransactionService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.transactionService.transactionHistoryChanged.subscribe(
      (transactions : Transaction[]) => {
        this.transactionList = transactions;
      }
    );
    this.transactionList = this.transactionService.getTodayTransactions();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update(id : number){
    this.router.navigate(['/transacions/edit/', id]);
  }
}
