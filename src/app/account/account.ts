import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account-service';

//import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';
@Component({
  selector: 'app-account',
  imports: [FormsModule,CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class AccountComponent  {

  account: Account | null = null;

  accountId: number |null= null;

  depositAmount: number | null = null;
  withdrawAmount : number |null =null;
  message: string = '';

  errorMessage: string = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccount();
  }

  loadAccount(): void {
    if (this.accountId === null) {
      this.errorMessage = 'Please enter an account ID.';
      return;
    }
    this.accountService
      .getAccountDetails(this.accountId)
      .subscribe({
        next: (response : Account) => {
          this.account = response;
        },

        error: (error :Account) => {
          console.error(error);
          this.errorMessage = 'Unable to load account details.';
        }
      });
  }

  deposit(): void {
    this.message = '';
    this.errorMessage = '';
    if (this.accountId === null) {
      return;
    }

    if (!this.depositAmount || this.depositAmount <= 0) {
      this.errorMessage = 'Please enter a valid deposit amount.';
      return;
    }

    this.accountService
      .depositMoney(this.accountId, this.depositAmount)
      .subscribe({
        next: (response : any) => {

          this.message = response.message;

          this.depositAmount = null;

          // Reload account so the updated balance is displayed
          this.loadAccount();
        },

        error: (error : any) => {

          console.error(error);

          this.errorMessage =
            error.error?.message ||
            'Deposit failed. Please try again.';
        }
      });
  }


  withdraw(): void {

    this.message = '';
    this.errorMessage = '';
    if (this.accountId === null) {
      return;
    }

    if (!this.withdrawAmount || this.withdrawAmount <= 0) {
      this.errorMessage = 'Please enter a valid withdraw amount.';
      return;
    }

    this.accountService
      .withdrawMoney(this.accountId, this.withdrawAmount)
      .subscribe({
        next: (response : any) => {

          this.message = response.message;

          this.withdrawAmount = null;

          // Reload account so the updated balance is displayed
          this.loadAccount();
        },

        error: (error : any) => {

          console.error(error);

          this.errorMessage =
            error.error?.message ||
            'withdrawl failed. Please try again.';
        }
      });
  }
}
