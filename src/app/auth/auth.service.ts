import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly validEmail = 'uner@gmail.com';
  private readonly validPassword = 'password123';

  private isUserAuthenticated = false;

  constructor() {}

  authenticate(email: string, password: string): Observable<boolean> {
    const isAuthenticated = email === this.validEmail && password === this.validPassword;
    if (isAuthenticated) {
      this.isUserAuthenticated = true;
    }
    return of(isAuthenticated);
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.isUserAuthenticated);
  }

  logout(): void {
    this.isUserAuthenticated = false;
  }

  
}
