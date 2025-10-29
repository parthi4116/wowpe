import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ErroPageComponent } from './pages/erro-page/erro-page.component';
import { AuthGuard } from './guards/auth.guard';
import { TransactionComponent } from './pages/transaction/transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'transactionlist', component: TransactionComponent, canActivate: [AuthGuard]},
  { path: '**', component: ErroPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
