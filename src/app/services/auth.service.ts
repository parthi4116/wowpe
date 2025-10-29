import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route:Router) {}

  // 🧾 Register a new user and save in localStorage
  register(user: any): Observable<any> {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // check if user already exists
    const existingUser = users.find((u: any) => u.email === user.email);
    if (existingUser) {
      return throwError(() => ({ message: 'Email already exists' }));
    }

    // add new user
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return of({ message: 'Registration successful', user });
  }

   login(credentials: { email: string; password: string }): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      return throwError(() => ({ message: 'Invalid email or password' }));
    }

    // save current user
    localStorage.setItem('currentUser', JSON.stringify(user));
    return of({ message: 'Login successful', user });
  }

   saveCredentials(email: string, password: string, user: any) {
    const data = { email, password, name: user?.name || '', mobile: user?.mobile || '' };
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  // 👤 Get currently logged-in user
  getUser() {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  // 🚪 Logout user
  logout() {
    localStorage.removeItem('currentUser');
        this.route.navigate(['/login']);
    // localStorage.clear();

  }

  // ✅ Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
