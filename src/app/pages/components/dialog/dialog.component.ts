import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    private toastr: ToastrService,
    private paymentService: PaymentService
  ) {}

 ngOnInit(): void {
  this.initForm()
  }
initForm(){
    this.transactionForm = this.fb.group({
      upiId: ['', [Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]],
      amount: [null, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
}
  sendMoney() {
    if (this.transactionForm.invalid) return;

    const { upiId, amount, notes } = this.transactionForm.value;
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) {
      this.toastr.error('Invalid UPI ID format (e.g., name@bank)' );
      return;
    }
    const currentBalance = Number(localStorage.getItem('walletBalance') || 0);

    if (amount > currentBalance) {
      this.toastr.error('Insufficient balance!');
      return;
    }

    const newBalance = currentBalance - amount;
    localStorage.setItem('walletBalance', newBalance.toString());
    this.paymentService.updateBalance(newBalance);

    const transactions = JSON.parse(localStorage.getItem('Transactions') || '[]');
    const newTransaction = {
      id: Math.floor(1000 + Math.random() * 9000).toString(), // Random 4-digit ID
      upiId,
      amount: Number(amount),
      notes: notes || '',
      status: 'success',
      date: new Date().toISOString(),
      type: 'debit'
    };

    transactions.push(newTransaction);
    localStorage.setItem('Transactions', JSON.stringify(transactions));

    this.toastr.success(`₹${amount} sent to ${upiId}`, 'Transaction Successful');
    this.dialogRef.close("success");
  }

  close() {
    this.dialogRef.close();
  }
}

