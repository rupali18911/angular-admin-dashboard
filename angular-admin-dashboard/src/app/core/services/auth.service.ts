import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  login(email: string, password: string): boolean {
    if (email === 'admin@test.com' && password === '123456') {
      localStorage.setItem('token', 'fake-jwt-token');
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }
}
