import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
 
// Shared Components
import { SearchComponent } from './pages/components/search/search.component';
import { DialogComponent } from './pages/components/dialog/dialog.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { PaginationComponent } from './pages/components/pagination/pagination.component';
import { ConfermationPopupComponent } from './pages/components/confermation-popup/confermation-popup.component';

// Services
import { AuthService } from './services/auth.service';
import { PaymentService } from './services/payment.service';


// Guards
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// pipe
import { TitleCasePipe } from './pipes/titlecase.pipe';

// Directives
import { StatusDirective } from './directives/status.directive';
import { AddMoneyComponent } from './pages/components/add-money/add-money.component';
import { TransactionComponent } from './pages/transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    PaginationComponent,
    SearchComponent,
    TitleCasePipe,
    HeaderComponent,
    ConfermationPopupComponent,
    StatusDirective,
    AddMoneyComponent,
    TransactionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    PaymentService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
