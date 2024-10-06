import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) { }


  login(username: string, password: string): boolean {

    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Verifica se o usuário está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Logout
  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/auth']);
  }
}
