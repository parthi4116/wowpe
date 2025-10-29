import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 
@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss']
})
export class AddMoneyComponent {
 
  addMoneyForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
     @Inject(MAT_DIALOG_DATA) public message: any,
        private dialogRef: MatDialogRef<AddMoneyComponent>
  ) {
    this.addMoneyForm = this.fb.group({
      amount: ['', Validators.required],
       
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addMoneyForm.invalid) return;

    this.dialogRef.close(this.addMoneyForm.value);

    console.log('Form Data:', this.addMoneyForm.value);
  }
}
