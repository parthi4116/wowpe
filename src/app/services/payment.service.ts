import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private balanceSubject = new BehaviorSubject<number>(0);
  balance$ = this.balanceSubject.asObservable();

  constructor() {
    const savedBalance = Number(localStorage.getItem('walletBalance') || '0');
    this.balanceSubject.next(savedBalance);
  }

  getCurrentBalance(): number {
    return this.balanceSubject.value;
  }

  addMoney(amount: number): Observable<number> {
    const newBalance = this.balanceSubject.value + amount;
    this.updateBalance(newBalance);
    return of(newBalance);
  }

  deductMoney(amount: number): Observable<number> {
    const newBalance = Math.max(0, this.balanceSubject.value - amount);
    this.updateBalance(newBalance);
    return of(newBalance);
  }

  public updateBalance(newBalance: number) {
    this.balanceSubject.next(newBalance);
    localStorage.setItem('walletBalance', newBalance.toString());
  }

  clearWallet() {
    this.updateBalance(0);
  }
}
