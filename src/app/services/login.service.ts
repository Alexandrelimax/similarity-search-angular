import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { ILogin } from '../interfaces/ilogin';

const database = 'http://localhost:3000/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  login(login: ILogin): Observable<IUser | undefined> {
    return this.httpClient.get<IUser[]>(database).pipe(
      map(users =>
        users.find(user => user.email === login.email && user.senha === login.senha)
      )
    );
  }
}
