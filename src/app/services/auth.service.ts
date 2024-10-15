import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSessionDto } from '../interfaces/iuser-dto';
import { IUser } from '../interfaces/iuser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticate = new BehaviorSubject<UserSessionDto | null>(null);
  isAuthenticate$ = this.userAuthenticate.asObservable();

  constructor() {
    // Restaura o usuário autenticado do localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Supondo que você tenha uma forma de obter o usuário com base no token
      this.userAuthenticate.next(new UserSessionDto({ token } as IUser)); // Adapte conforme necessário
    }
  }

  saveToken(user: IUser): void {
    localStorage.setItem('token', user.token);
    this.userAuthenticate.next(new UserSessionDto(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userAuthenticate.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
