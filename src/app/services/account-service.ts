import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:5273';

  constructor(private http: HttpClient) {}

  getAccountDetails(accountId: number): Observable<Account> {
    return this.http.get<Account>(
      `${this.apiUrl}/detail/${accountId}`
    );
  }
  depositMoney(accountId: number, amount: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/deposit`,
      {
        accountId: accountId,
        amount: amount
      }
    );

  }
  withdrawMoney(accountId: number, amount: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/withdraw`,
      {
        accountId: accountId,
        amount: amount
      }
    );
    
  }
}