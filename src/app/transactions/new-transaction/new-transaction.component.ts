import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../transaction.model';
import { DatePipe } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { TransactionHttpService } from '../../http-service/transaction-http-service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {

  currencies = ["EUR","USD","GBP","NOK","SEK","DKK","CHF","AUD","CAD","CZK","HUF"];
  types = ["Buy","Sell"];
  transactionForm : FormGroup;
  editMode : boolean = false;
  transactionId : number = null;
  editedTransaction : Transaction;
  

  constructor(private datePipe : DatePipe,
              private transactionHttpService : TransactionHttpService,
              private transactionService : TransactionService,
              private activeRoute : ActivatedRoute) { }

  ngOnInit() {
    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Max',
    //     'email': 'max@test.com'
    //   },
    //   'gender': 'male',
    //   'hobbies': []
    // });

    this.transactionForm = new FormGroup({
      'transactionData' : new FormGroup({
        'type' : new FormControl("Buy"),
        'currency' : new FormControl("EUR"),
        'amountOfCurrency' : new FormControl(null),
        'rateOfExchange' : new FormControl(null),
        'amountOfZlotych' : new FormControl(null)
      })
    });

    this.activeRoute.params.subscribe( (params : Params) =>{
      this.transactionId = +params['transactionId'];
      this.editMode = true;
      if(this.transactionId != 0)
        this.setValueWhenEditPastTransaction();
      else
        this.setValueWhenNewTransactionOccure();
      });

    // this.transactionForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

  }

  setValueWhenNewTransactionOccure(){
    this.editMode = false;
    this.editedTransaction = null;
    this.transactionId = -1;
    this.transactionForm.setValue({
      'transactionData' : {
        'currency' : 'EUR',
        'type' : 'Sell',
        'amountOfCurrency' : '100',
        'rateOfExchange' : '4.4',
        'amountOfZlotych' : '440'
      }
    });
  }

  setValueWhenEditPastTransaction(){
    this.editedTransaction = this.transactionService.getTransactionById(this.transactionId)[0];
    this.transactionForm.setValue({
      'transactionData' : {
        'currency' : this.editedTransaction.currency,
        'type' : this.editedTransaction.type,
        'amountOfCurrency' : this.editedTransaction.amountOfCurrency,
        'rateOfExchange' : this.editedTransaction.rateOfExchange,
        'amountOfZlotych' : this.editedTransaction.amountOfZlotych
      }
    });
    this.transactionForm.get('transactionData.currency').disabled;
    this.transactionForm.get('transactionData.type').disabled;
  }

  convert(){  
      let currencyAmount = +this.transactionForm.get('transactionData.amountOfCurrency').value;
      let rate = +this.transactionForm.get('transactionData.rateOfExchange').value;
      let zloteAmount = Math.round((currencyAmount * rate) * 100) / 100;
      this.transactionForm.patchValue({
        'transactionData' : {
          'amountOfZlotych' : zloteAmount
        }
      })
  }

  executeTransaction(){
    if(!this.editMode)
      this.createAndSendTransaction();
    else if(this.editMode)
      this.editTransaction();
  }

  editTransaction(){
    let form = this.transactionForm;
    this.editedTransaction.amountOfCurrency = form.get('transactionData.amountOfCurrency').value;
    this.editedTransaction.amountOfZlotych = form.get('transactionData.amountOfZlotych').value;
    this.editedTransaction.rateOfExchange = form.get('transactionData.rateOfExchange').value;
    this.transactionHttpService.editTransaction(this.editedTransaction);
  }

  createAndSendTransaction(){
    this.convert();
    let now = Date.now();
    let date = this.datePipe.transform(now, "yyyy-MM-dd");
    let time = this.datePipe.transform(now, "yyyy-MM-dd HH:mm:ss");
    let form = this.transactionForm;
    let id = -1;
    let newTransaction  = new Transaction(id,
                                          form.get('transactionData.currency').value,
                                          form.get('transactionData.type').value,
                                          form.get('transactionData.amountOfCurrency').value,
                                          form.get('transactionData.amountOfZlotych').value,
                                          form.get('transactionData.rateOfExchange').value,
                                          date, time);
    console.log(newTransaction);
    this.transactionHttpService.sendTransaction(newTransaction);
  }

}
