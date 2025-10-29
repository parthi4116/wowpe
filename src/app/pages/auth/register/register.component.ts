import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMoneyComponent } from '../../components/add-money/add-money.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  slideCheck = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$')
      ]],
      mobile: ['', Validators.required]
    });
  }

  slideMove() {
    const { name, email, password, mobile } = this.registerForm.controls;
    this.submitted = true;

    if (!this.slideCheck) {
      if (name.invalid || email.invalid || password.invalid || mobile.invalid) {
        this.toastr.error('Please fill all required fields');
        return;
      } else {
        this.submitted = false;
        this.slideCheck = true;
      }
    } else {
      this.slideCheck = false;
    }
  }


  opendialog() {
    const dialogRef = this.dialog.open(AddMoneyComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.amount) {
        localStorage.setItem('walletBalance', result.amount);
        this.toastr.success(`₹${result.amount} added successfully`);
       this.onSubmit();
      }
    
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const { name, email, mobile, password } = this.registerForm.value;
    const payload = { name, email, mobile, password };

    this.auth.register(payload).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err.message || 'Registration failed');
      }
    });
  }

}
