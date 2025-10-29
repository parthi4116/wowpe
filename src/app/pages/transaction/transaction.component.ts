import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { AddMoneyComponent } from '../components/add-money/add-money.component';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  filterDate: string = '';
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;

  allTransactions: any[] = [];
  filteredTransactions: any[] = [];
  currentAmount: number = 0;
  checkUser: any;
  viewMode: 'list' | 'card' = 'list'; // default to list view

  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null;
    this.checkUser = userRole?.role;

    this.paymentService.balance$.subscribe((balance) => {
      this.currentAmount = balance;
    });

    this.loadTransactions();
  }

  loadTransactions() {
    this.allTransactions = JSON.parse(
      localStorage.getItem('Transactions') || '[]'
    );
    this.applyFilters();
  }

  // ✅ Combined search + date + pagination
  applyFilters() {
    let filtered = [...this.allTransactions];

    if (this.searchText) {
      const search = this.searchText.trim().toLowerCase();
      filtered = filtered.filter(
        (txn) =>
          txn.upiId?.toLowerCase().includes(search) ||
          txn.status?.toLowerCase().includes(search) ||
          txn.type?.toLowerCase().includes(search)
      );
    }

    if (this.filterDate) {
      const from = new Date(this.filterDate + 'T00:00:00');
      const to = new Date(this.filterDate + 'T23:59:59');

      filtered = filtered.filter((txn) => {
        const txnDate = new Date(txn.date);
        return txnDate >= from && txnDate <= to;
      });
    }

    this.totalItems = filtered.length;

    // paginate
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredTransactions = filtered.slice(start, end);
  }

  onFiltersChanged(filters: { searchText: string; filterDate: string }) {
    this.searchText = filters.searchText;
    this.filterDate = filters.filterDate;
    this.currentPage = 1; // reset to first page on new filter
    this.applyFilters();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.applyFilters();
  }

  addMoney(amount: number) {
    this.paymentService.addMoney(amount).subscribe((balance) => {
      console.log('New Balance:', balance);
    });
  }

  addmoney() {
    const dialogRef = this.dialog.open(AddMoneyComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this.addMoney(result.amount);
        this.loadTransactions();
      }
    });
  }

  openTransactionForm() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadTransactions();
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
