import { Component, OnInit, OnDestroy} from '@angular/core';
import { CurrencyState } from '../currency-state.model';
import { Subscription } from 'rxjs/Subscription';
import { CurrencyStateService } from '../currency-state.service';

@Component({
  selector: 'app-currency-state-list',
  templateUrl: './currency-state-list.component.html',
  styleUrls: ['./currency-state-list.component.css']
})

export class CurrencyStateListComponent implements OnInit, OnDestroy {
  
  currencyStateList : CurrencyState[];
  subscription : Subscription ;

constructor(private currencyStateServices: CurrencyStateService){

}

ngOnInit() {
    this.subscription = this.currencyStateServices.currencyStateChanged
        .subscribe(
          (stateList : CurrencyState[]) => {
            this.currencyStateList = stateList;
          }
        );
        this.currencyStateList = this.currencyStateServices.getCurrencyStateList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
